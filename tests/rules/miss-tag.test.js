const MissTag = require('../../app/rules/miss-tag')

test('Miss title', () => {
    const r = new MissTag({
        tag: 'title'
    })
    expect(r.toSelector()).toBe('title')
})

test('Miss title inside head', () => {
    const r = new MissTag({
        tag: 'title',
        parent: 'head'
    })
    expect(r.toSelector()).toBe('head > title')
})