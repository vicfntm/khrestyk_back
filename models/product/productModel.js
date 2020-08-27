const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Image = require('./imageModel').imageSchema

const productSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    price: Number,
    qty_available: Number,
    createdAt: Date,
    updatedAt: Date,
    category: {
        type: String,
        trim: true
    },
    images: {
        type: [Image]
    }

})

productSchema.pre('save', function(next){
    const date = new Date();
    this.createdAt = date.toISOString();
    next();
});
productSchema.pre('update', function(next){
    const date = new Date();
    this.updatedAt = date.toISOString();
    next();
});

module.exports = mongoose.model('Product', productSchema);