const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const user = require('./userModel').userSchema
const bproduct = require('./basketProduct').bProductSchema
const basketSchema = new mongoose.Schema({
    products: {
        type: [bproduct]
    },
    userInfo: {
       type: user
    },
    orderStatus: {
        type: String,
        enum: ['started', 'sent'],
        validate: {
            validator: () => Promise.resolve(false),
            message: 'orderStatus validation error'
          }
    }
})

module.exports = mongoose.model('Basket', basketSchema);