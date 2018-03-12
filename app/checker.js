
class Checker {

    /**
     * @param htmlText
     * @param rules
     */
    check(htmlText, rules) {
        const dom = new DomQuery(htmlText)
        let results = []
        rules.forEach(rule => {
            let rs = rule.check(dom)
            if (rs) {
                results.push(rs)
            }
        });
        return results
    }

}

module.exports = { Checker }