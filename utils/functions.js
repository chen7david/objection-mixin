const crypto = require('crypto')

const self = {
    pluralize: require('./pluralize'),
    timestamp: () => new Date().toISOString(),
    notIn: (setA, setB) => setA.filter(el => !setB.includes(el)),
    md5: () => crypto.createHash('md5').update(`${Math.random()}`).digest('hex'),
    toms: (str) => {

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

    notIn: (setA, setB) => setA.filter(el => !setB.includes(el)),

    randInt: (min,max) => Math.floor(Math.random() * (max - min + 1)) + min,

    randEl: (array) => {
        const randInt = self.randInt(0, array.length -1)
        return array[randInt]
    },

    randChar: () => {
        const chars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ"
        return self.randEl(chars)
    },

    serialInt: (mask) => {
        let serial = ""
        if(mask) {
            for(let i = 0; i < mask.length; i++){
                let maskChar = mask[i] 
                serial += maskChar == "0" ? self.randInt(0,9) : maskChar
            }
        }
        return serial
    },

    serialChar: (mask) => {
        let serial = ""
        if(mask) {
            for(let i = 0; i < mask.length; i++){
                let maskChar = mask[i] 
                serial += maskChar == "0" ? self.randChar() : maskChar
            }
        }
        return serial
    },
}

module.exports = self
