const { BaseController } = require("./baseController");


module.exports = class AdminController extends BaseController {


    constructor(){
        super()
        this.model = require('../models/imports').basket
    }

    async index(req) {
        return await this.model.find({})
    }


}