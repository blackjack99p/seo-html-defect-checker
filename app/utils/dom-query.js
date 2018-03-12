const cheerio = require('cheerio')
const assert = require('assert')

class DomQuery {

    constructor(html = null) {
        if (html) {
            this.load(html)
        } else {
            this.query = null
        }
    }

    load(html) {
        this.query = cheerio.load(html)
        return this
    }

    count(selector) {
        assert.notEqual(this.query, null)
        return this.query(selector).length
    }

}

module.exports = DomQuery