const Checker = require('../app/checker')
const rules = require('../app/rules')

const htmlText = `
    <html>
        <head>
            <meta name="abc"></meta>
            <meta name="des">Hello this is my test</meta>
        </head>
        <body>
            <ul id="fruits">
                <li class="apple"><a href="#" rel="apple">Apple</a></li>
                <li class="orange">Orange</li>
                <li class="pear">Pear</li>
            </ul>
            <a href="http://shop.com">this is a link</a>
            <img src="1.jpg">
            <img src="2.jpg" alt="pic">
            <div class="box">
                <img src="3.jpg">
            </div>
            <p><strong>aaa</strong>bbbb<strong>aaa</strong>bbbb<strong>aaa</strong>bbbb</p>
            <p><strong>aaa</strong>bbbb<strong>aaa</strong>bbbb<strong>aaa</strong>bbbb</p>
            <p><strong>aaa</strong>bbbb<strong>aaa</strong>bbbb<strong>aaa</strong>bbbb</p>
            <p><strong>aaa</strong>bbbb<strong>aaa</strong>bbbb<strong>aaa</strong>bbbb</p>
            <p><strong>aaa</strong>bbbb<strong>aaa</strong>bbbb<strong>aaa</strong>bbbb</p>
            <p><strong>aaa</strong>bbbb<strong>aaa</strong>bbbb<strong>aaa</strong>bbbb</p>
            <h1>title</h1>
            <h1>title2</h1>
        </body>
    </html>
`

test('img tag without alt', () => {
    const c = new Checker(htmlText)
    const results = c.check([rules.imgTagWithoutAlt]).getResults()
    expect(results).toContain('There are 2 <img> tags without alt')
})

test('a tag without rel', () => {
    const c = new Checker(htmlText)
    const results = c.check([rules.aTagWithoutRel]).getResults()
    expect(results).toContain('There is 1 <a> tag without rel')
})

test('miss title tag', () => {
    const c = new Checker(htmlText)
    const results = c.check([rules.dontHaveTitle]).getResults()
    expect(results).toContain('This HTML without <title> tag')
})

test('miss meta with name=descriptions attribute', () => {
    const c = new Checker(htmlText)
    const results = c.check([rules.dontHaveMetaDescription]).getResults()
    expect(results).toContain('This HTML without <meta> tag with name=descriptions')
})

test('miss meta with name=keywords attribute', () => {
    const c = new Checker(htmlText)
    const results = c.check([rules.dontHaveMetaKeywords]).getResults()
    expect(results).toContain('This HTML without <meta> tag with name=keywords')
})

test('have more than 15 strong tag', () => {
    const c = new Checker(htmlText)
    const results = c.check([rules.moreThan15StrongTag]).getResults()
    expect(results).toContain('This HTML have more than 15 <strong> tag(s)')
})

test('have more than 1 h1 tag', () => {
    const c = new Checker(htmlText)
    const results = c.check([rules.moreThan1H1Tag]).getResults()
    expect(results).toContain('This HTML have more than 1 <h1> tag(s)')
})
