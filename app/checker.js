const stream = require('stream')
const fs = require('fs')
const rules = require('./rules')
const DomQuery = require('./utils').DomQuery

/**
 * I borrow this function from https://stackoverflow.com/a/28575015 with fix style
 *
 * @param {stream.Readable} obj
 */
function isReadableStream(obj) {
    return typeof obj === 'object' &&
        obj instanceof stream.Readable &&
        typeof obj._read === 'function' &&
        typeof obj._readableState === 'object'
}

function isWritableStream(obj) {
    return typeof obj === 'object' &&
        obj instanceof stream.Writable &&
        typeof obj._write === 'function' &&
        typeof obj._writeableState === 'object'
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
        input.write(results)
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
        });
        this.results = results
        return this
    }

    getResults() {
        return this.results
    }

    writeResults() {
        writeOuputResult(this.output, this.results)
        return this
    }

    isPass() {
        return typeof this.results === 'array' && this.results.length === 0
    }
}

module.exports = Checker