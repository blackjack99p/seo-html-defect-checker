
const MissAttribute = require('./miss-attribute')
const MissTag = require('./miss-tag')
const MoreTagThan = require('./more-tag-than')

const defaultDefinedRules = [
    {
        name: '<a> tag without rel',
        rule: new MissAttribute('a', {
            rel: null
        }),
    },
    {
        name: '<img> tag without alt',
        rule: new MissAttribute('img', {
            alt: null
        })
    },
    {
        name: 'does not have <title> tag',
        rule: new MissTag('head > title', {})
    },
    {
        name: 'does not have <meta name="descriptions" … /> tag',
        rule: new MissTag('head > meta', {
            name: 'descriptions'
        })
    },
    {
        name: 'does not have <meta name="keywords" … /> tag',
        rule: new MissTag('head > meta', {
            name: 'keywords'
        })
    },
    {
        name: 'more than 15 <strong> tag in HTML',
        rule: new MoreTagThan('strong', {}, 15)
    },
    {
        name: 'more than one <H1> tag',
        rule: new MoreTagThan('h1', {}, 1)
    }
]