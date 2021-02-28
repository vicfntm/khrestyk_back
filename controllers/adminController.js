const { BaseController } = require("./baseController");


module.exports = class AdminController extends BaseController {


    constructor(){
        super()
        this.model = require('../models/imports').cart
    }

    async index(req) {
        return await this.model.find({})
    }


}