const { BaseController } = require("../../controllers/baseController");

module.exports = class orderProcessing extends  BaseController{

    constructor(){
        super()
        this.model = require('../../models/imports').basket
    }

    async updateOrder(request){
        const id = request.param('id')
        const status = request.param('status')
        // find element
        try{
            const date = new Date();
            // const order = await this.model.findOneAndUpdate({_id: id}, {$push: {processing: {processingStatus: status, content: ''}}});
            const order = await this.model.updateOne({_id: id}, {$push: {processing: {processingStatus: status, createdAt : date.toISOString()}}, 'orderStatus': status}, {returnOriginal: false});
            console.log('ORDER', order)
        }catch(err){
            return {code: this.notFound}
        }
        // update
        // send mail if need

        console.log('ID', id)
        console.log('STATUS', status)
        return 'ok'

    }
}
