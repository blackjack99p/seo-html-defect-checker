const MissTag = require('../../app/rules/miss-tag')
const DomQuery = require('../../app/utils/dom-query')

test('Selector: Miss title', () => {
    const r = new MissTag('title', {})
    expect(r.toSelector()).toBe('title')
})

test('Selector: Miss title inside head', () => {
    const r = new MissTag('title', {}, 'head >')
    expect(r.toSelector()).toBe('head > title')
})

test('Check: miss title', () => {
    const r= new MissTag('title', {})
    const htmlText = `
        <html>
            <head></head>
            <body></body>
        </html>
    `
    const dom = new DomQuery(htmlText)
    expect(r.check(dom)).toBe('This HTML without <title> tag')
})

test('Check: miss title inside head', () => {
    const r= new MissTag('title', {}, 'head >')
    const htmlText = `
        <html>
            <head></head>
            <body></body>
        </html>
    `
    const dom = new DomQuery(htmlText)
    expect(r.check(dom)).toBe('This HTML without <title> tag')
})