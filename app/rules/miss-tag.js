
/**
 * Miss tag rule
 */
class MissTag {

    constructor(tag, attributes) {   
        this.tag = tag
        this.attributes = attributes
    }

    toSelector() {
        let selector = this.tag
        for (let i in this.attributes) {
            if (this.attributes[i]) {
                selector += `[${i}=${this.attributes[i]}]`
            } else {
                selector += `[${i}]`
            }
        }
        return selector
    }

    check() {
        return null
    }
}

module.exports = MissTag