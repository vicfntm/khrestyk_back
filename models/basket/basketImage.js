const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const iSchema = new mongoose.Schema({
    is_main: {
        type: Boolean,
        required: true
    },
    alt: String,
    url: String,
    image: String,
    createdAt: String,
})

exports.iSchema = iSchema;
exports.imageModel = mongoose.model('BasketImage', iSchema)