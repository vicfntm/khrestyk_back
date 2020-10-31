const { Binary } = require('mongodb');
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const iSchema = new mongoose.Schema({
    alt: String,
    image: String,
    createdAt: String,
    baseCode: String
})

iSchema.pre('save', function(next){
    const image = this.image
    console.log('CCCCCCREATE', image)
    next();
});
iSchema.pre('update', function(next){
    const image = this.image
    console.log('UUUUUUUUUUPDATE!', image)
    next();
});

exports.iSchema = iSchema;
exports.imageModel = mongoose.model('BasketImage', iSchema)