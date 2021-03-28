const jwt = require('jsonwebtoken')
const model = require('../auth/models/users').userSchema
module.exports = async (req, res, next) => {
    const token = req.headers.token
    try {
        res.locals.jwt = await jwt.verify(token, process.env.JWT_PK)
        res.locals.user = await getUser(res.locals.jwt)
        next()
    } catch (err) {
        next(err)
    }
}

async function getUser(jwt) {
    return await model.findOne({_id: jwt._id})
}
