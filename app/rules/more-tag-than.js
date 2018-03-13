const MissTagRule = require('./miss-tag')
const Converter = require('../utils/converter')

class MoreTagThan extends MissTagRule {
    constructor(tag, attributes, preselector = null, expectedTagNumber = 1) {
        super(tag, attributes, preselector)
        this.expectedTagNumber = expectedTagNumber
    }

    check(domQuery) {
        const num = domQuery.count(this.toSelector())
        if (num > this.expectedTagNumber) {
            const attrNames = Converter.convertObjectToString(this.attributes)
            return `This HTML have more than ${this.expectedTagNumber} <${this.tag}> tag(s)` + (attrNames.length > 0 ? ` with ${attrNames}` : '')
        }
        return null
    }
}

module.exports = MoreTagThan