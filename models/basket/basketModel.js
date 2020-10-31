const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const user = require('./userModel').userSchema
const cartproduct = require('./basketProduct').cartSchema

const basketSchema = new mongoose.Schema({
    products: {type: [cartproduct]},
    userInfo: {
       type: user
    },
    orderStatus: {
        type: String,
        enum: ['started', 'sent']
        // ,
        // validate: {
        //     validator: () => Promise.resolve(false),
        //     message: 'orderStatus validation error'
        //   }
    },
    updatedAt: String,
    createdAt: String
})

basketSchema.pre('update', function(next){
    const date = new Date();
    this.updatedAt = date.toISOString();
    next();
})

basketSchema.pre('save', function(next){
    const date = new Date();
    this.createdAt = date.toISOString();
    next();
})

basketSchema.pre('findOneAndUpdate', function(data, next){
    const date = new Date();
    this.updatedAt = date.toISOString();
    next();
});

basketSchema.pre('query', function(query, next) {
    console.log('REQUEST ===== REQUEST');
    query.populate('Category');
    next();

})

module.exports = mongoose.model('Basket', basketSchema);