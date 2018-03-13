const MissTag = require('./miss-tag')


class CustomRule extends MissTag {
    constructor(tag, attributes, preselector = null, customFn = null) {
        super(tag, attributes, preselector)
        this.customFn = customFn
    }

    check(domQuery) {
        return typeof this.customFn === 'function' ?
            this.customFn.call(this, domQuery, this.toSelector()) :
            null
    }
}

module.exports = CustomRule