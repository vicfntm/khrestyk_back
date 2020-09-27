const { ObjectID } = require('mongodb')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const bImages = require('./basketImage').iSchema

const bProductSchema = new mongoose.Schema({
    _id: ObjectID,
    title: String,
    images: [bImages],
    created_at: String,
    amount: Number,
    price: Number
})

exports.bpSchema = bProductSchema
exports.bpModel = mongoose.model('bProductModel', bProductSchema)