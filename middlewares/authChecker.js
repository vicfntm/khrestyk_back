const bcrypt = require('bcrypt')
const model = require('../auth/models/users').userSchema
const jwtLib = require('jsonwebtoken')
const fs = require('fs')
path = require('path')

module.exports = async(req, res, next) => {
    if (req.body.hasOwnProperty('password') && req.body.hasOwnProperty('login')) {
        const userFound = await model.findOne({login: req.body.login})
        if (userFound) {
            const isPasswordValid = await bcrypt.compare(req.body.password, userFound.password)
            if (isPasswordValid) {
                const privateKey = process.env.JWT_PK
                req.token = await jwtLib.sign({id: userFound._id}, privateKey, {expiresIn: '1 hour'})
                next()
            }
        }

    }
}
