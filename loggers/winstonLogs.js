const winston = require('winston')

winston.configure({
    transports: [
        new (winston.transports.File)({filename: 'winston.log'})
    ]
})
module.exports = winston