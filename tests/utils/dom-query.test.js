const DomQuery = require('../../app/utils/dom-query')


const htmlText = `
<html><body>
    <p>test1</p>
    <p class="highlight">test2</p>
    <p class="note highlight">test3</p>
</body></html>
`

const dom = new DomQuery(htmlText)

test('count elements', () => {
    expect(dom.count('p')).toBe(3)
})

test('count elements 2', () => {
    expect(dom.count('p.highlight')).toBe(2)
})

test('count elements 3', () => {
    expect(dom.count('p.note.highlight')).toBe(1)
})

test('load break html', () => {
    const breakHtml = `
        <html><body>
            <p>test1</p>
            <p class="highlight>test2</p>
            <p>ok tag</p>
        </body></html>
    `
    const breakDom = new DomQuery(breakHtml)
    expect(breakDom.count('p')).toBe(1)
})