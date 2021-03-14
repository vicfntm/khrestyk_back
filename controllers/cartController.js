const { BaseController } = require("./baseController");
const definer = require('../services/email/receiverDefiner')
const broker = require('../services/email/messageBroker')
const event = broker('email')
require('../conn/mongooseConn')
module.exports = class cartController extends BaseController {

    constructor(){  
        super()
        this.model = require('../models/imports').cart
    }
    async store(payload){
        let mailTarget;
        let cart;
        if(payload.hasOwnProperty('userInfo')){
            mailTarget = definer(payload.orderStatus, payload.userInfo.email)
        }
        if(payload.hasOwnProperty('id')){
             const doc = await this.model.findOne({_id: payload.id})
             const update = (await doc).overwrite({...payload, $inc: {__v: 1}})
             await update.save()
            event(mailTarget, payload.orderStatus, {msg: `new order: ${update._id}`})
            return {message: this.messages.message.edit.success, data: update, code: this.ok}
        }
        try{
            cart = new this.model(payload)
            await cart.save()
            event(mailTarget, payload.orderStatus, {msg: `new order: ${cart._id}`})
            return {message: this.messages.message.create.success, data: cart, code: this.ok}
        }catch(err){
            return {message: this.messages.message.create.fail, data: null, code: this.unprocessable}

        }
        
    }
    async all(){
        try{
            const data = await this.model.find({})
            return  {message: this.messages.message.show.success, data: data, code: this.accepted}

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