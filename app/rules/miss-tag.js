const Converter = require('../utils/converter')

/**
 * Miss tag rule
 */
class MissTag {

    constructor(tag, attributes, preselector = null) {
        this.tag = tag
        this.attributes = attributes
        this.preselector = preselector
    }

    toSelector() {
        let selector = this.preselector ? `${this.preselector} ${this.tag}` : this.tag
        for (let i in this.attributes) {
            if (this.attributes[i]) {
                selector += `[${i}=${this.attributes[i]}]`
            } else {
                selector += `[${i}]`
            }
        }
        return selector
    }

    check(domQuery) {
        const num = domQuery.count(this.toSelector())
        if (num === 0) {
            const attrNames = Converter.convertObjectToString(this.attributes)
            return `This HTML without <${this.tag}> tag` + (attrNames.length > 0 ? ` with ${attrNames}` : '')
        }
        return null
    }
}

module.exports = MissTag