# SEO HTML defect checker
Lightweight module for checking SEO HTML defect elements.

<b>Built for</b>
- [NodeJS](https://nodejs.org)

# Status

[![Build Status](https://travis-ci.org/doha99/seo-html-defect-checker.svg?branch=master)](https://travis-ci.org/doha99/seo-html-defect-checker)

## Installation

This is node.js libarary. Install nodejs first, then:

```npm install seo-html-defect-checker```

or

```yarn add seo-html-defect-checker```

## How to use?

There are 7 defined rules that you can use to validate HTML.

1. Detect if there are any `<img />` tags without alt attribute
2. Detect if there are any `<a />` tags without rel attribute
3. In <head> tag
* Detect if there is any header that doesn’t have `<title>` tag
* Detect if there is any header that doesn’t have `<meta name=“descriptions” … />` tag
* Detect if there is any header that doesn’t have `<meta name=“keywords” … />` tag
4. Detect if there are more than 15 `<strong>` tag in HTML (15 is a value should be configurable by user)
5. Detect if a HTML have more than one `<H1>` tag.

Rules object as follows:
```javascript
Rules = {
  definedRules : {
    aTagWithoutRel,
    imgTagWithoutAlt,
    dontHaveTitle,
    dontHaveMetaDescription,
    dontHaveMetaKeywords,
    moreThan15StrongTag,
    moreThan1H1Tag,
  }
}
```
For example:

```javascript
const {Checker, Rules} = require('seo-html-defect-checker')

const c = new Checker(htmlText)
c.check([Rules.definedRules.aTagWithoutRel], (results) => {
  // manipulate results
})
```

There is a defined rule list that include 7 rules as follows example:
```javascript
const {Checker, Rules} = require('seo-html-defect-checker')
const htmlText = loadHtmlFunction() // function return string
const c = new Checker(htmlText)
c.check(Rules.definedRules.defaultRuleList, (results) => { // results is array
  // manipulate results
})
```

And you can customize the rules list such as
```javascript
const {Checker, Rules} = require('seo-html-defect-checker')
const htmlText = loadHtmlFunction() // function return string
const c = new Checker(htmlText)
const myRules = [
  Rules.definedRules.aTagWithoutRel,
  Rules.definedRules.dontHaveMetaDescription
]
c.check(myRules, results => {
  console.log(results)
})
```

Beside that you can customize the rule throw 4 objects:
```javascripts
Rules = {
  //....
  MissAttributeRule,  // check tags that don't have some specific attributes
  MissTagRule,  // check HTML without tags which have some specific attributes (or only just tags)
  MoreTagThanRule, // check there is more than a specific number of tags which occur in HTML
  CustomRule, // custom whatever rule you want
}
```
Examples:
```javascripts
const {MissAttributeRule, MissTag, MoreTagThan} = Rules
const r1 = new MissAttributeRule('img', {
    alt: null,
})
const r2 = new MissTag('title', {}, 'head >')
const r3 = new MoreTagThan('strong', {}, null, 5)
const rules = [r1, r2, r3]
const c = new Checker(htmlText)
c.check(rules, results => {
  // manipulate results
})
```

```javascripts
const {CustomRule} = Rules
const r4 = new CustomRule('meta', {
        'keywords*': 'shopping'
    }, 'head >', (dom, selector) => {
        var num = dom.count(selector)
        if (num == 0) {
            return 'miss shopping keyword'
        }
        return null
    })
const c = new Checker(htmlText)
c.check([r4], results => {
  // manipulate results
})
```

And you can customize your selector query
```javascripts
const r5 = new CustomRule('p', {}, null, (dom, selector) => {
        var num = dom.count('p.highlight:not(.warning)')
        if (num == 0) {
            return `there are ${num} p tags with hightlight class and without warning class`
        }
        return null
    })
const c = new Checker(htmlText)
c.check([r4], results => {
  // manipulate results
})
```

## API

## Features

- [x] Detect HTML element defect by the defined rules
- [x] Can add customize rule flexibility
- [ ] Support i18n

## Contribute

Let people know how they can contribute into your project.

## License
A short snippet describing the license (MIT, Apache etc)

MIT © [DoHa](https://github.com/doha99/seo-html-defect-checker/blob/master/LICENSE)
