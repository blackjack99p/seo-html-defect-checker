
const MissAttributeRule = require('./miss-attribute')
const MissTagRule = require('./miss-tag')
const MoreTagThanRule = require('./more-tag-than')
const CustomRule = require('./custom-rule')

const aTagWithoutRel = new MissAttributeRule('a', {rel: null})

const imgTagWithoutAlt = new MissAttributeRule('img', {alt: null})

const dontHaveTitle = new MissTagRule('title', {}, 'head >')

const dontHaveMetaDescription = new MissTagRule('meta', {name: 'descriptions'}, 'head >')

const dontHaveMetaKeywords = new MissTagRule('meta', {name: 'keywords'}, 'head >')

const moreThan15StrongTag = new MoreTagThanRule('strong', {}, null, 15)

const moreThan1H1Tag = new MoreTagThanRule('h1', {}, null, 1)

const defaultRuleList = [
    aTagWithoutRel,
    imgTagWithoutAlt,
    dontHaveTitle,
    dontHaveMetaDescription,
    dontHaveMetaKeywords,
    moreThan15StrongTag,
    moreThan1H1Tag
]

module.exports = {
    definedRules : {
        defaultRuleList,
        aTagWithoutRel,
        imgTagWithoutAlt,
        dontHaveTitle,
        dontHaveMetaDescription,
        dontHaveMetaKeywords,
        moreThan15StrongTag,
        moreThan1H1Tag,
    },
    MissAttributeRule,
    MissTagRule,
    MoreTagThanRule,
    CustomRule,
}