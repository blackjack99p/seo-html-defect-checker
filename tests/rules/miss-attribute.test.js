const MissAttributeRule = require('../../app/rules/miss-attribute.js')
const DomQuery = require('../../app/utils/dom-query')

const htmlText = `
    <html>
        <head>
            <meta name="abc"></meta>
            <meta name="descriptions">Hello this is my test</meta>
        </head>
        <body>
            <ul id="fruits">
                <li class="apple">Apple</li>
                <li class="orange">Orange</li>
                <li class="pear">Pear</li>
            </ul>
            <a href="http://shop.com">this is a link</a>
            <img src="1.jpg">
            <img src="2.jpg" alt="pic">
            <div class="box">
                <img src="3.jpg">
            </div>
        </body>
    </html>
`

test('selector: img tag without alt', () => {
    const r = new MissAttributeRule('img', {
        alt: null,
    })
    expect(r.toSelector()).toBe('img:not([alt])')
})

test('selector: a tag without rel', () => {
    const r = new MissAttributeRule('a', {
        'rel': null
    })
    expect(r.toSelector()).toBe('a:not([rel])')
})

test('selector: a tag without rel and class*=logo', () => {
    const r = new MissAttributeRule('a', {
        'rel': null,
        'class*':  'logo',
    })
    expect(r.toSelector()).toBe('a:not([rel]):not([class*=logo])')
})

test('check: a tag without rel', () => {
    const r = new MissAttributeRule('a', {
        'rel': null,
    })
    const dom = new DomQuery(htmlText)
    expect(r.check(dom)).toBe('There is 1 <a> tag without rel')
})

test('check: img tag without alt', () => {
    const r = new MissAttributeRule('img', {
        alt: null,
    })
    const dom = new DomQuery(htmlText)
    expect(r.check(dom)).toBe('There are 2 <img> tags without alt')
})

test('check: img tag without alt ', () => {
    const r = new MissAttributeRule('img', {
        alt: null,
    }, '.box')
    const dom = new DomQuery(htmlText)
    expect(r.check(dom)).toBe('There is 1 <img> tag without alt')
})