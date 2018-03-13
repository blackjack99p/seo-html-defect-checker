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

function getInputText(input) {
    if (typeof input === 'string') {
        return input
    } else if (isReadableStream(input)) {
        return input.read()
    }
    throw 'Invalid input source.'
}

function writeOuputResult(output, results) {
    if (typeof console === 'object' && output === console) {
        output.log(results)
    }
    else if (isWritableStream(output)) {
        output.write(results)
    }
    else if (typeof output === 'string') {
        fs.writeFileSync(output, results)
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
        this.output = output ? output : console
        // @todo verify input, output
    }

    /**
     * @param rules
     */
    check(rules) {
        const htmlText = getInputText(this.input)
        const dom = new DomQuery(htmlText)
        let results = []
        rules.forEach(rule => {
            let rs = rule.check(dom)
            if (rs) {
                results.push(rs)
            }
        })
        this.results = results
        return this
    }

    getResults() {
        return this.results
    }

    writeResults() {
        let outputText = this.results.length > 0 ? this.results.join('\n') : 'All tests are passed.'
        writeOuputResult(this.output, outputText)
        return this
    }

    isPass() {
        return Array.isArray(this.results) && this.results.length === 0
    }
}

module.exports = Checker