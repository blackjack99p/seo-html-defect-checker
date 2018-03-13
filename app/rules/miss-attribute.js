
/**
 * Miss attribute rule
 */
class MissAttribute {

    constructor(tag, attributes, preselector = null) {
        this.tag = tag
        this.attributes = attributes
        this.preselector = preselector
    }

    toSelector() {
        let selector = this.preselector ? `${this.preselector} ${this.tag}` : this.tag
        for (let i in this.attributes) {
            if (this.attributes[i]) {
                selector += `:not([${i}=${this.attributes[i]}])`
            } else {
                selector += `:not([${i}])`
            }
        }
        return selector
    }

    check(domQuery) {
        const num = domQuery.count(this.toSelector())
        if (num > 0) {
            const attrNames = Object.keys(this.attributes).join(', ')
            return num > 1 ?
                `There are ${num} <${this.tag}> tags without ${attrNames}` :
                `There is 1 <${this.tag}> tag without ${attrNames}`
        }
        return null
    }
}

module.exports = MissAttribute