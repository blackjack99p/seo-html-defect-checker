const CustomRule = require('../../app/rules/custom-rule')
const DomQuery = require('../../app/utils/dom-query')

test('check: meta keywords must include shopping', () => {
    const r = new CustomRule('meta', {
        'keywords*': 'shopping'
    }, 'head >', (dom, selector) => {
        var num = dom.count(selector)
        if (num == 0) {
            return 'miss shopping keyword'
        }
        return null
    })
    const dom = new DomQuery(`
        <html><head>
            <meta keywords="fashion electric">
        </head><body></body></html>
    `)
    expect(r.check(dom)).toBe('miss shopping keyword')
})

test('check 2: meta keywords must include shopping', () => {
    const r = new CustomRule('meta', {
        'keywords*': 'shopping'
    }, 'head >', (dom, selector) => {
        var num = dom.count(selector)
        if (num == 0) {
            return 'miss shopping keyword'
        }
        return null
    })
    const dom = new DomQuery(`
        <html><head>
            <meta keywords="fashion electric shopping">
        </head><body></body></html>
    `)
    expect(r.check(dom)).toBe(null)
})