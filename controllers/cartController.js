const { RequestHeaderFieldsTooLarge } = require("http-errors");
const { BaseController } = require("./baseController");
const fs = require('fs')

module.exports = class cartController extends BaseController {

    constructor(){  
        super()
        this.model = require('../models/imports').cart
    }
    async store(payload){
        let cart;
        if(payload.hasOwnProperty('id')){
             const doc = await this.model.findOne({_id: payload.id})
            console.log("PAYLOAD CC", payload)
             const update = (await doc).overwrite({...payload, $inc: {__v: 1}})
             await update.save()
            return {message: this.messages.message.edit.success, data: update, code: this.ok}
        }
        try{
            cart = new this.model(payload)
            await cart.save()
            return {message: this.messages.message.create.success, data: cart, code: this.ok}
        }catch(err){
            return {message: this.messages.message.create.fail, data: null, code: this.unprocessable}
        }
        
    }
    async all(){
        try{
            const cartInstances = await this.model.find()
            return  {message: this.messages.message.show.success, data: cartInstances, code: this.accepted}

        }catch (err){
            return {message: this.messages.message.create.fail, data: null, code: this.serverError}
        }

    }

   async show(id){
        try{
            const cartInstance = await this.model.find({_id : id})
            return  {message: this.messages.message.show.success, data: cartInstance, code: this.accepted}
        }catch(err){
            return {message: this.messages.message.create.fail, data: null, code: this.notFound}
        }
   }
}