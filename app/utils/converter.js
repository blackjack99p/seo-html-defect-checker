

function convertObjectToString(obj){
    const results = []
    for (let i in obj) {
        if (obj[i]) {
            results.push(`${i}=${obj[i]}`)
        } else {
            results.push(`${i}`)
        }
    }
    return results.join(', ')
}

module.exports = {
    convertObjectToString
}