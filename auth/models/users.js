const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    }
})


userSchema.methods.generateAuthToken = function(_id) {
    return jwt.sign({_id, role: 'admin'}, process.env.JWT_PK)
}
exports.userSchema = userSchema;
exports.userSchema = mongoose.model('DbUser', userSchema)