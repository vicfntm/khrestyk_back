const bcrypt = require('bcryptjs')

module.exports = async(req, res, next) => {

    if(req.body.hasOwnProperty('password')){
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    next()
}