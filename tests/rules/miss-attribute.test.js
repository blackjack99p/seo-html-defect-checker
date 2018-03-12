const MissAttributeRule = require('../../app/rules/miss-attribute.js')

test('miss alt in img tag', () => {
    const r = new MissAttributeRule({
        tag: 'img', 
        attribute: 'alt'
    })
    expect(r.toSelector()).toBe('img:not([alt])')
})

test('miss rel in a tag', () => {
    const r = new MissAttributeRule({
        tag: 'a',
        attribute: 'rel',
    })
    expect(r.toSelector()).toBe('a:not([rel])')
})