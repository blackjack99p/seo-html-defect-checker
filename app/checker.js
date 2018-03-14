const stream = require('stream')
const fs = require('fs')
const DomQuery = require('./utils').DomQuery

/**
 * @param {object} obj
 */
function isReadableStream(obj) {
    return typeof obj === 'object' && obj instanceof stream.Readable
}

function isWritableStream(obj) {
    return typeof obj === 'object' && obj instanceof stream.Writable
}

function loadFromStream(readStream) {
    return new Promise((resolve, reject) => {
        const chucks = []
        readStream
            .on('data', (chuck) => {
                chucks.push(chuck.toString())
            })
            .on('end', () => {
                resolve(chucks.join(''))
            })
            .on('err', (err) => {
                reject(err)
            })
    })
}

function getInputText(input, cb) {
    if (typeof input === 'string') {
        cb(input)
    } else if (isReadableStream(input)) {
        loadFromStream(input).then(data => {
            cb(data)
        })
    } else {
        cb(null, 'Invalid input source.')
    }
}

function writeOuputResult(output, results, cb) {
    if (cb == undefined || cb == null) {
        cb = () => {}
    }
    if (typeof console === 'object' && output === console) {
        output.log(results)
        cb()
    }
    else if (isWritableStream(output)) {
        output.write(results, cb)
    }
    else if (typeof output === 'string') {
        fs.writeFile(output, results, cb)
    }
}

class Checker {

    /**
     *
     * @param {string|stream.Readable} input
     * @param {console|stream.Writable|string} output
     */
    constructor(input, output = null) {
        this.input = input
        this.output = output
        // @todo verify input, output
    }

    /**
     * @param rules
     * @param {Function} cb Callback function, if cb is null, the results will be written by output
     *
     */
    check(rules, cb) {
        if (cb === undefined || cb === null) {
            cb = () => {}
        }
        getInputText(this.input, (htmlText) => {
            const dom = new DomQuery(htmlText)
            let results = []
            rules.forEach(rule => {
                let rs = rule.check(dom)
                if (rs) {
                    results.push(rs)
                }
            })
            this.results = results
            if (this.output) {
                this.writeOutput(() => {
                    cb.call(this, results)
                })
            } else {
                cb.call(this, results)
            }
        })
        return this
    }

    writeOutput(cb) {
        let outputText = this.results.length > 0 ? this.results.join('\n') : 'All tests are passed.'
        writeOuputResult(this.output, outputText, cb)
        return this
    }
}

module.exports = Checker