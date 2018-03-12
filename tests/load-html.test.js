const cheerio = require('cheerio')

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
            <div id="box1">
            </div>
        </body>
    </html>
`;

const $ = cheerio.load(htmlText)

test('test parse html', () => {
    expect($('li').length).toBe(3)
    
})

test('test parse html 2', () => {
    expect($('a:not([rel])').text()).toBe('this is a link')
})

test('test parser html 3', () => {
    expect($('#box1 img').length).toBe(0)
})

test('test parser html 4', () => {
    expect($('head meta[name=keywords]').length).toBe(0)
})

test('test parser html 5', () => {
    expect($('head meta[name=descriptions]').length).toBe(1)
})

test('test miss title', () => {
    expect($('title').length).toBe(0)
})