const cheerio = require('cheerio')

class DomQuery {

    constructor(html = null) {
        if (html) {
            this.load(html)
        }
    }

    load(html) {
        this.query = cheerio.load(html)
    }

    count(selector) {
        return this.query(selector).length
    }

}

module.exports = DomQuery