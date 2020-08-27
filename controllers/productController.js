
const {BaseController} = require('./baseController')
const {ObjectID} = require('mongodb')
module.exports =  class ProductController extends BaseController {

    constructor(){
        super()
        this.productModel = require('../models/imports').product
         
    }

    async index () {
        
        const connection = (await this.connect).collection('products').find({})
        const c = await connection.toArray()
        console.log(c)
        connection.close()

        return c;
    }

    async show(id){
        try{
            const singleElem = await (await this.connect).collection('products').findOne({"_id": new ObjectID(id)})
            return {message: this.messages.message.show.success, code: this.accepted, data: singleElem} 
        }catch(err){
            return  {message: this.messages.message.show.fail, err: err.message, code: this.notFound}
        }
    }

    update(id){

        return {status: `${this.messages.message.edit.success} with id: ${id}`}
    }

    async store(payload){
        const product = new this.productModel(payload)
            const savedProduct = await product.save()
            return {status: this.messages.message.create.success, data: savedProduct}
    }

    async storeForm(payload){
        
        const files = payload.files;
        let fullProduct = payload.body;
        let result;
        if(files.length > 0){
          const images = files.map((file, i) => {
            return {
                'url': this.urlHandler(file.path), 
                'alt': payload.body.images[i].alt, 
                'is_main': payload.body.images[i].is_main
            }
            
        }) 
        fullProduct = {...payload.body, ...{images:images}}; 
        }
        try{
            const product = new this.productModel(fullProduct)
            const savedProduct = await product.save() 
            result = {status: this.messages.message.create.success, data: savedProduct, code: this.created}    
        }catch(err){
            result = {status: this.messages.message.create.fail, err: err.message, code: this.unprocessabe}
        }
        return result
}

    urlHandler(url){
        return url.split('/public/')[1];
}
}