const crypto = require('crypto')

const self = {
    pluralize: require('./pluralize'),
    timestamp: () => new Date().toISOString(),
    notIn: (setA, setB) => setA.filter(el => !setB.includes(el)),
}

module.exports = self
