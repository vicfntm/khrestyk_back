const mongoose = require('mongoose')
mongoose.Promise = global.Promise

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

exports.userSchema = userSchema;
exports.userSchema = mongoose.model('DbUser', userSchema)