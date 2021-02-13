const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const processingEvent = new mongoose.Schema({
    processingStatus: String,
    content: String,
    updatedAt: String,
    createdAt: String
})

processingEvent.pre('update', function(next){
    const date = new Date();
    this.updatedAt = date.toISOString();
    next();
})

processingEvent.pre('save', function(next){
    const date = new Date();
    this.createdAt = date.toISOString();
    next();
})
exports.pEvent = processingEvent
module.exports = mongoose.model('Processing', processingEvent);