const jwt = require('jsonwebtoken')
const model = require('../auth/models/users').userSchema
module.exports = async (req, res, next) => {
    const token = getHeader(req)
    res.locals.jwt = jwt.verify(token, process.env.JWT_PK)
    res.locals.user = await getUser(res.locals.jwt)
    next()
}

function getHeader(req){
    if(req.headers.token){
        return req.headers.token
    }
    throw new Error('token not provided')
}
async function getUser(jwt){
    return await model.findOne({_id: jwt.id})
}
