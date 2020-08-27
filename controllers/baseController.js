exports.BaseController =  class BaseController {
    constructor(){
        const {conn, objectId} = require('../conn/clearMongoConnect');
        this.storageData = require('../dummy/products.json')
        this.messages = require('../config/responseMessages.json')
        this.connect = conn();
        this.ObjectId = objectId
        this.unprocessable = 422;
        this.created = 201;
        this.notFound = 404;
        this.accepted = 202;
        this.ok = 200;
    }
}