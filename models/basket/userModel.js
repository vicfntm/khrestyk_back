const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    comments: String
})

exports.userSchema = userSchema
exports.userModel = mongoose.model('UserModel', userSchema)