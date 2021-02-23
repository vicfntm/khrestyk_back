const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const imageSchema = new mongoose.Schema({
    alt: String,
    is_main: {
        type: Boolean,
        required: true
    },
    url: String
})

exports.imageSchema = imageSchema;
exports.imageModel = mongoose.model('Image', imageSchema)