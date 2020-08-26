
const {BaseController} = require('./baseController')

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

    create(id){
        const singleElem = this.storageData.products.filter(item => {
            return item._id === id
         });
        
         return singleElem.length != 0 ? singleElem : {message: this.messages.message.fail.noData};
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
        const images = files.map((file, i) => {
            return {
                'url': this.urlHandler(file.path), 
                'alt': payload.body.images[i].alt, 
                'is_main': payload.body.images[i].is_main
            }
            
        })
        const fullProduct = {...payload.body, ...{images:images}};
        const product = new this.productModel(fullProduct)
        const savedProduct = await product.save()
        return {status: this.messages.message.create.success, data: savedProduct}
}

    urlHandler(url){
        return url.split('/public/')[1];
}
}