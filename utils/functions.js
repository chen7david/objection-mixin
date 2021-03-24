const crypto = require('crypto')

const self = {
    pluralize: require('./pluralize'),
    timestamp: () => new Date().toISOString(),
    notIn: (setA, setB) => setA.filter(el => !setB.includes(el)),
    md5: () => crypto.createHash('md5').update(`${Math.random()}`).digest('hex'),
    toMiliSeconds: (str) => {

        const unit = str.slice(str.length - 1)
    
        units = {
            "s": 1,
            "m": 60,
            "h": 60 * 60,
            "d": 24 * 60 * 60,
            "w": 7 * 24 * 60 * 60
        }
    
        if(!Object.keys(units).includes(unit)) return false
        const magnitude = parseInt(str, 10)
        if(!magnitude) return false
        return magnitude * units[unit] * 1000
    },
}

module.exports = self
