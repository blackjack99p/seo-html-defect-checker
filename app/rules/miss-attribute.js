
/**
 * Miss attribute rule
 */
class MissAttribute {

    constructor(tag, attributes) {   
        this.tag = tag
        this.attributes = attributes
    }

    toSelector() {
        let selector = this.tag
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
        const num = domQuery.count(this.selector)
        if (num > 0) {
            const attrNames = Object.keys(this.attributes).join(', ')
            return num > 1 ? 
                `There are ${num} ${this.tag} tags without ${attrNames}` :
                `There is 1 ${this.tag} tag without ${attrNames}`
        }
        return null
    }
}

module.exports = MissAttribute