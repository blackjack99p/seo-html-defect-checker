const MoreTagThan = require('../../app/rules/more-tag-than')
const DomQuery = require('../../app/utils/dom-query')


test('Select: strong tag', () => {
    const r = new MoreTagThan('strong', {}, null, 15)
    expect(r.toSelector()).toBe('strong')
})

test('Select: strong tag with class=underline', () => {
    const r = new MoreTagThan('strong', {class: 'underline'})
    expect(r.toSelector()).toBe('strong[class=underline]')
})

test('check: more than 1 <h1> tags', () => {
    const r = new MoreTagThan('h1', {}, null, 1)
    const dom = new DomQuery(`
        <html><head></head><body>
            <h1>hello</h1>
            <p>this is dummy test</p>
            <h1>Hello again</h1>
            <p>this is dummy test</p>
        </body></html>
    `)
    expect(r.check(dom)).toBe('This HTML have more than 1 <h1> tag(s)')
})

test('check: more than 5 <strong> tags', () => {
    const r = new MoreTagThan('strong', {}, null, 5)
    const dom = new DomQuery(`
        <html><head></head><body>
            <h1>hello</h1>
            <p>this is dummy test<strong>aaa</strong><strong>aaa</strong><strong>aaa</strong><strong>aaa</strong></p>
            <h1>Hello again</h1>
            <p>this is dummy test<strong>aaa</strong><strong>aaa</strong><strong>aaa</strong></p>
        </body></html>
    `)
    expect(r.check(dom)).toBe('This HTML have more than 5 <strong> tag(s)')
})