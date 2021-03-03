const bcrypt = require('bcrypt')
const model = require('../auth/models/users').userSchema
const jwtLib = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        checkProperties(req)
        const userFound = await findUser(req.body.login)
        await checkIsPasswordValid(req.body.password, userFound.password)
        const privateKey = process.env.JWT_PK
        res.locals.token = await jwtLib.sign({id: userFound._id}, privateKey, {expiresIn: '1 hour'})
        next()
    }catch(err){
        next(err)
    }
}

function checkProperties(req) {
    if (req.body.hasOwnProperty('password') && req.body.hasOwnProperty('login')) {
        return true
    }
    throw new Error('payload inconsistent')
}

async function findUser(login) {
    const userFound = await model.findOne({login})
    if (userFound) {
        return userFound
    }
    throw new Error('user not found')
}
async function checkIsPasswordValid(recPassword, dbPassword){
    const isValid = await bcrypt.compare(recPassword, dbPassword)
    if(isValid){
        return isValid
    }
    throw new Error('invalid password')
}
