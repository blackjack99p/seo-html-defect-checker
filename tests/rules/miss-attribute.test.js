const MissAttributeRule = require('../../app/rules/miss-attribute.js')

test('img tag without alt', () => {
    const r = new MissAttributeRule('img', {
        alt: null,        
    })
    expect(r.toSelector()).toBe('img:not([alt])')
})

test('a tag without rel', () => {
    const r = new MissAttributeRule('a', {
        'rel': null
    })
    expect(r.toSelector()).toBe('a:not([rel])')
})

test('a tag without rel and class*=logo', () => {
    const r = new MissAttributeRule('a', {
        'rel': null,
        'class*':  'logo',
    })
    expect(r.toSelector()).toBe('a:not([rel]):not([class*=logo])')
})