exports.BaseController =  class BaseController {
    constructor(){
        const {conn} = require('../conn/clearMongoConnect');
        this.storageData = require('../dummy/products.json')
        this.messages = require('../config/responseMessages.json')
        this.connect = conn();
    }
}