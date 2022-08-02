const { BaseController } = require("../../controllers/baseController")
const broker = require('../../services/email/messageBroker')
const event = broker('email')
const definer = require('../../services/email/receiverDefiner')
module.exports = class orderProcessing extends  BaseController{

    constructor(){
        super()
        this.model = require('../../models/imports').cart
    }

    async updateOrder(request){
        const id = request.param('id');
        const status = request.param('status');
        try{
            const date = new Date();
            const orderObject = await this.model.findOne({_id: id});
            orderObject.processing.push( {content: request.body.content, processingStatus: status, createdAt : date.toISOString()})
            orderObject.orderStatus = status;
            const order = await orderObject.save();
            const sendTo = definer(status, orderObject.userInfo.email);
            event(sendTo, status, {msg: request.body.content});
            // will be send only if sentTo differ than undefined

            return {message: this.messages.message.create.success, code: this.accepted, data: order}
        }catch(err){
            console.log(err);
            return {message: this.messages.message.show.unprocessable, code: this.serverError, data: null}
        }
    }
}
