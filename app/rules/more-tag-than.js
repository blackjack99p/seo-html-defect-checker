const MissTagRule = require('./miss-tag')

class MoreTagThan extends MissTagRule {
    constructor(tag, attributes, preselector = null, expectedTagNumber = 1) {
        super(tag, attributes, preselector)
        this.expectedTagNumber = expectedTagNumber
    }

    check(domQuery) {
        const num = domQuery.count(this.toSelector())
        if (num > this.expectedTagNumber) {
            const attrNames = Object.keys(this.attributes).join(', ')
            return `This HTML have more than ${this.expectedTagNumber} <${this.tag}> tag(s)`
        }
        return null
    }
}

module.exports = MoreTagThan