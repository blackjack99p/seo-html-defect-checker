const fs = require('fs')
const path = require('path')
const request = require('request')

const Checker = require('../app/checker')
const rules = require('../app/rules')

const invalidHtmlText = `
    <html>
        <head>
            <meta name="abc">
            <meta name="des" content="Hello this is my test">
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

const validHtmlText = `
    <html>
        <head>
            <meta name="keywords" content="nodejs, ruby, python, golang, php,...">
            <meta name="descriptions" content="this is site desc">
            <meta name="robots"/>
            <title>Hello</title>
        </head>
        <body>
            <h1>big title</h1>
            <a href="#" rel="nofollow">
                <img src="1.jpg" alt="pic for shop">
            </a>
            <p><strong>aaa</strong>bbbb<strong>aaa</strong>bbbb<strong>aaa</strong>bbbb</p>
            <p><strong>aaa</strong>bbbb<strong>aaa</strong>bbbb<strong>aaa</strong>bbbb</p>
            <p><strong>aaa</strong>bbbb<strong>aaa</strong>bbbb<strong>aaa</strong>bbbb</p>
            <p><strong>aaa</strong>bbbb<strong>aaa</strong>bbbb<strong>aaa</strong>bbbb</p>
        </body>
    </html>
`

test('img tag without alt', () => {
    const c = new Checker(invalidHtmlText)
    c.check([rules.definedRules.imgTagWithoutAlt], (results) => {
        expect(results).toContain('There are 2 <img> tags without alt')
    })
})

test('a tag without rel', () => {
    const c = new Checker(invalidHtmlText)
    c.check([rules.definedRules.aTagWithoutRel], (results) => {
        expect(results).toContain('There is 1 <a> tag without rel')
    })
})

test('miss title tag', () => {
    const c = new Checker(invalidHtmlText)
    c.check([rules.definedRules.dontHaveTitle], results => {
        expect(results).toContain('This HTML without <title> tag')
    })
})

test('miss title tag with valid html', () => {
    const c = new Checker(validHtmlText)
    c.check([rules.definedRules.dontHaveTitle], results => {
        expect(results.length).toBe(0)
    })
})

test('miss meta with name=descriptions attribute', () => {
    const c = new Checker(invalidHtmlText)
    c.check([rules.definedRules.dontHaveMetaDescription], results => {
        expect(results).toContain('This HTML without <meta> tag with name=descriptions')
    })
})

test('miss meta with name=descriptions attribute with valid html', () => {
    const c = new Checker(validHtmlText)
    c.check([rules.definedRules.dontHaveMetaDescription], results => {
        expect(results.length).toBe(0)
    })
})

test('miss meta with name=keywords attribute', () => {
    const c = new Checker(invalidHtmlText)
    c.check([rules.definedRules.dontHaveMetaKeywords], results => {
        expect(results).toContain('This HTML without <meta> tag with name=keywords')
    })
})

test('have more than 15 strong tag', () => {
    const c = new Checker(invalidHtmlText)
    c.check([rules.definedRules.moreThan15StrongTag], results => {
        expect(results).toContain('This HTML have more than 15 <strong> tag(s)')
    })
})

test('have more than 1 h1 tag', () => {
    const c = new Checker(invalidHtmlText)
    c.check([rules.definedRules.moreThan1H1Tag], results => {
        expect(results).toContain('This HTML have more than 1 <h1> tag(s)')
    })
})

test('test all defined rules', () => {
    const c = new Checker(invalidHtmlText)
    c.check(rules.definedRules.defaultRuleList, results => {
        expect(results).toContain('There are 2 <img> tags without alt')
        expect(results).toContain('There is 1 <a> tag without rel')
        expect(results).toContain('This HTML without <meta> tag with name=keywords')
        expect(results).toContain('This HTML without <meta> tag with name=descriptions')
        expect(results).toContain('This HTML without <title> tag')
        expect(results).toContain('This HTML have more than 15 <strong> tag(s)')
        expect(results).toContain('This HTML have more than 1 <h1> tag(s)')
    })
})

test('test all defined rules with valid html', () => {
    const c = new Checker(validHtmlText)
    c.check(rules.definedRules.defaultRuleList, results => {
        expect(results.length).toBe(0)
    })
})

test('custom 1: miss content c# for meta', () => {
    const c = new Checker(validHtmlText)
    const custom = [
        new rules.MissAttributeRule('meta', {
            'content*' : 'csharp'
        }, 'head >')
    ]
    c.check(custom, results => {
        expect(results).toContain('There are 3 <meta> tags without content*=csharp')
    })
})

test('custom 2: check meta[name=robots] exists', () => {
    const c = new Checker(validHtmlText)
    const custom = [
        new rules.CustomRule('meta', {name:'robots'}, 'head >', function(domQuery, selector) {
            if (domQuery.count(selector) > 0) {
                return 'This HTML has meta[name=robots] tag.'
            }
            return null
        })
    ]
    c.check(custom, results => {
        expect(results).toContain('This HTML has meta[name=robots] tag.')
    })
})

test('custom 3: count a[rel=nofollow]', () => {
    const custom = [
        new rules.CustomRule('a', {rel:'nofollow'}, null, function(domQuery, selector) {
            const num = domQuery.count(selector)
            if (num > 0) {
                return num > 1 ?
                    `There are ${num} <a> tags with rel=nofollow` :
                    'There is 1 <a> tags with rel=nofollow'
            }
            return 'There is no tag with rel=nofollow'
        })
    ]

    let c = new Checker(validHtmlText)
    c.check(custom, results => {
        expect(results).toContain('There is 1 <a> tags with rel=nofollow')
    })

    c = new Checker(invalidHtmlText)
    c.check(custom, results => {
        expect(results).toContain('There is no tag with rel=nofollow')
    })
})

const expectOutputText = `There is 1 <a> tag without rel
There are 2 <img> tags without alt
This HTML without <title> tag
This HTML without <meta> tag with name=descriptions
This HTML without <meta> tag with name=keywords
This HTML have more than 15 <strong> tag(s)
This HTML have more than 1 <h1> tag(s)`

test('test write to stream', () => {
    const filepath = path.join(__dirname, '__output.txt')
    const writer = fs.createWriteStream(filepath)
    const c = new Checker(invalidHtmlText, writer)
    c.check(rules.definedRules.defaultRuleList, () => {
        const writeContent = fs.readFileSync(filepath).toString()
        expect(writeContent).toBe(expectOutputText)
        fs.unlinkSync(filepath)
    })
})

test('test write to file path', () => {
    const filepath = path.join(__dirname, '__output2.txt')
    const c = new Checker(invalidHtmlText, filepath)
    c.check(rules.definedRules.defaultRuleList, () => {
        const writeContent = fs.readFileSync(filepath).toString()
        expect(writeContent).toBe(expectOutputText)
        fs.unlinkSync(filepath)
    })
})

test('test write to console', () => {
    /* eslint no-console: "off" */
    const _log = console.log
    console.outText = ''
    console.log = function() {
        _log.call(arguments)
        console.outText += arguments[0]
    }
    const c = new Checker(invalidHtmlText, console)
    c.check(rules.definedRules.defaultRuleList, () => {
        expect(console.outText).toBe(expectOutputText)
    })
})

test('test read from stream', () => {
    const filepath = path.join(__dirname, '__input.txt')
    const reader = fs.createReadStream(filepath)
    const c = new Checker(reader)
    c.check(rules.definedRules.defaultRuleList, (results) => {
        expect(results.length).toBe(7)
    })
})

test('test read from http request stream 2', () => {
    const url = 'https://raw.githubusercontent.com/doha99/seo-html-defect-checker/master/tests/__input.txt'
    request(url).on('response', response => {
        const c = new Checker(response)
        c.check(rules.definedRules.defaultRuleList, (results) => {
            expect(results.length).toBe(7)
        })
    })
})