const { BaseController } = require("../../controllers/baseController")

module.exports = class AuthController extends BaseController {


    constructor(){
        super()
        this.model = require('../models/users').userSchema
    }
    async createUser(req) {
        try{
            this.model.create(req.body)
            return {status: this.messages.message.create.success, code: this.created, data: null}
        }catch (err){
            return {status: this.messages.message.create.fail, code: this.unprocessable, data: null}
        }
    }
    async login(req){
        return req.token
    }


}