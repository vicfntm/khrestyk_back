const { BaseController } = require("./baseController");

module.exports = class basketController extends BaseController {

    constructor(){
        super()
        this.model = require('../models/imports').basket
    }
    async store(payload){
        let cart;
        if(payload.hasOwnProperty('id')){
            cart = await this.model.findOneAndUpdate({_id: payload.id}, payload, {upsert: true, lean:true, returnOriginal: false})
            return {message: this.messages.message.edit.success, data: cart}
        }else{
            cart = new this.model(payload)
            await cart.save()
        }
        return {message: this.messages.message.create.success, data: cart}
        
    }
}