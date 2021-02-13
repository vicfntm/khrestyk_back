const { BaseController } = require("../../controllers/baseController");

module.exports = class orderProcessing extends  BaseController{

    constructor(){
        super()
        this.model = require('../../models/imports').basket
    }

    async updateOrder(request){
        const id = request.param('id')
        const status = request.param('status')

        console.log('ID', id)
        console.log('STATUS', status)
        return 'ok'

    }
}
