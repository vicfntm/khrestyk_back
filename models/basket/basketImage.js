const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const iSchema = new mongoose.Schema({
    alt: String,
    image: String,
    createdAt: String
})

exports.iSchema = iSchema;
exports.imageModel = mongoose.model('BasketImage', iSchema)