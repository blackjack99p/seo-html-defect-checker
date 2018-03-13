
const MissAttribute = require('./miss-attribute')
const MissTag = require('./miss-tag')
const MoreTagThan = require('./more-tag-than')

const aTagWithoutRel = new MissAttribute('a', {rel: null})

const imgTagWithoutAlt = new MissAttribute('img', {alt: null})

const dontHaveTitle = new MissTag('head > title', {})

const dontHaveMetaDescription = new MissTag('head > meta', {name: 'descriptions'})

const dontHaveMetaKeywords = new MissTag('head > meta', {name: 'keywords'})

const moreThan15StrongTag = new MoreTagThan('strong', {}, 15)

const moreThan1H1Tag = new MoreTagThan('h1', {}, 1)

const defaultDefinedRules = [
    aTagWithoutRel,
    imgTagWithoutAlt,
    dontHaveTitle,
    dontHaveMetaDescription,
    dontHaveMetaKeywords,
    moreThan15StrongTag,
    moreThan1H1Tag
]

module.exports = {
    defaultDefinedRules,
    aTagWithoutRel,
    imgTagWithoutAlt,
    dontHaveTitle,
    dontHaveMetaDescription,
    dontHaveMetaKeywords,
    moreThan15StrongTag,
    moreThan1H1Tag
}