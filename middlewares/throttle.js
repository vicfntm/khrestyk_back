const RateLimiter = require('limiter').RateLimiter
const RATE_LIMIT = 60
const MS = 'minute'
const limiter = new RateLimiter(RATE_LIMIT, MS)


module.exports = (req, res, next) => {
    limiter.removeTokens(1, (err, remainReq) => {
        console.log('RR', Math.floor(remainReq))
        try {
            if (Math.floor(remainReq) <= 1) {
                throw new Error('not permitted')
            }
            next()
        } catch (err) {
            next(err)
        }
    })

}