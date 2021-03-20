const { BaseController } = require("./baseController")


module.exports = class AdminController extends BaseController {


    constructor(){
        super()
        this.model = require('../models/imports').cart
    }

    async index() {
        return this.model.find({})
    }


}