const { RequestHeaderFieldsTooLarge } = require("http-errors");
const { BaseController } = require("./baseController");

module.exports = class basketController extends BaseController {

    constructor(){  
        super()
        this.model = require('../models/imports').basket
    }
    async store(payload){
        let cart;
        if(payload.hasOwnProperty('id')){
            console.log('products', payload.products)
            
            //  payload.products.map(elem => elem.images.map( image => {console.log(image)}))
             const doc = this.model.findOne({_id: payload.id})
             const update = (await doc).overwrite({...payload, $inc: {__v: 1}})
             await update.save()
            return {message: this.messages.message.edit.success, data: update, code: this.ok}
        }
        try{
            cart = new this.model(payload)
            await cart.save()
            return {message: this.messages.message.create.success, data: cart, code: this.ok}
        }catch(err){
            console.log(err)
            return {message: this.messages.message.create.fail, data: null, code: this.unprocessable}
        }
        
    }
}