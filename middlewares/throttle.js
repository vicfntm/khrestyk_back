const RateLimiter = require('limiter').RateLimiter
const RATE_LIMIT = 60
const MS = 'minute'
const limiter = new RateLimiter(RATE_LIMIT, MS)
const winston = require('../loggers/logging')

module.exports = (req, res, next) => {
    limiter.removeTokens(1, (err, remainReq) => {
        winston.debug('RR ' + Math.floor(remainReq) )
        try {
            if (Math.floor(remainReq) <= 1) {
                winston.error('not permitted exception fired')
                throw new Error('not permitted')
            }
            next()
        } catch (err) {
            next(err)
        }
    })

}