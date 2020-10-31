const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const image = require('../basket/basketImage').iSchema

const cartSchema = new mongoose.Schema({
    'title': String,
    'images': {
        type: [image]
    },
    "amount": Number,
    "price": Number,
    "updatedAt" : String
})


exports.cartSchema = cartSchema
exports.cart = mongoose.model('Cart', cartSchema)