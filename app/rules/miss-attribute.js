
/**
 * Miss attribute rule
 */
class MissAttribute {

    /**
     * @param {String} tag          Tag name     
     * @param {String} attribute    Attribute name
     */
    constructor({ tag, attribute }) {
        this.tag = tag
        this.attribute = attribute
    }

    /**
     * @returns String  CSS selector
     */
    toSelector() {
        return `${this.tag}:not([${this.attribute}])`
    }
}

module.exports = MissAttribute