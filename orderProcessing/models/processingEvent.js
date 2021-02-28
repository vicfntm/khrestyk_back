const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const processingSchema = new mongoose.Schema({
    processingStatus: String,
    content: String,
    updatedAt: String,
    createdAt: String
})

processingSchema.pre('update', function(next){
    const date = new Date();
    this.updatedAt = date.toISOString();
    next();
})

processingSchema.pre('save', function(next){
    const date = new Date();
    this.createdAt = date.toISOString();
    next();
})

exports.processingSchema = processingSchema
exports.ProcessingModel = mongoose.model('Processing', processingSchema);