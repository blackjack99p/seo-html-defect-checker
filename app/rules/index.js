
const MissAttribute = require('./miss-attribute')
const MissTag = require('./miss-tag')
const MoreTagThan = require('./more-tag-than')

const aTagWithoutRel = new MissAttribute('a', {rel: null})

const imgTagWithoutAlt = new MissAttribute('img', {alt: null})

const dontHaveTitle = new MissTag('title', {}, 'head >')

const dontHaveMetaDescription = new MissTag('meta', {name: 'descriptions'}, 'head >')

const dontHaveMetaKeywords = new MissTag('meta', {name: 'keywords'}, 'head >')

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