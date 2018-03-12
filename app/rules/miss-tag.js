
/**
 * Miss tag rule
 */
class MissTag {

    /**
     * @param {String} tag          Tag name     
     * @param {String} attribute    Attribute name
     * @param {String} parent       Parent tag name 
     */
    constructor({ tag, attribute = null, parent = null }) {
        this.tag = tag
        this.attribute = attribute
        this.parent = parent
    }

    /**
     * @returns String
     */
    toSelector() {
        let selector = this.tag
        if (this.attribute) {
            selector += `[${this.attribute}]`
        }
        if (this.parent) {
            selector = `${this.parent} > ${selector}`
        }
        return selector
    }
}

module.exports = MissTag