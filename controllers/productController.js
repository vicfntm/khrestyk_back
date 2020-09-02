
const {BaseController} = require('./baseController')
const {ObjectID} = require('mongodb')
module.exports =  class ProductController extends BaseController {

    constructor(){
        super()
        this.productModel = require('../models/imports').product
         
    }

    async index () {
        
        const connection = (await this.connect).collection('products').find({})
        const products = await connection.toArray()
        connection.close()
        const categories = this.getUniqueCategories(products)
        return {message: this.messages.message.index.success, code: this.accepted, data: {products, categories: [...categories]}};
    }

    getUniqueCategories(products){
        const categories = new Set();
        products.map(item => {
            if(item.category !== undefined){
                categories.add(item.category)
         }} ) 
         return categories

    }

    async show(id){
        try{
            const connection = (await this.connect).collection('products').find({})
            const products = await connection.toArray()
            const singleElem =  products.find(i => i._id == id)
            connection.close()
            const categories = this.getUniqueCategories(products)
            if(singleElem){
                return {message: this.messages.message.show.success, code: this.accepted, data: {products, categories: [...categories]}} 
            }else{
                return {message: this.messages.message.show.fail, code: this.notFound, data: singleElem}
            }
        }catch(err){
            return  {message: this.messages.message.show.unprocessable, err: err.message, code: this.unprocessable}
        }
    }

    async update(req){
        
        try{
        // get images if exists
        if(req.files.length > 0){
            const images = req.files.map((item, key)=>{
                // console.log(item)
            })
            // console.log(req.body.images)
            delete req.body.images
        }
        // operate w string keys
        let singleElem;
        if(Object.keys(req.body).length > 0){
            singleElem = await (await this.connect).collection('products').findOneAndUpdate(
                {"_id": new ObjectID(req.params.id)},
                {$set: {...req.body, ...{'updatedAt': new Date()}}, $inc: {__v: 1}},
                { upsert: false})
        }

        if(singleElem){ 
            
                return {message: this.messages.message.show.success, code: this.accepted, data: singleElem.value} 
            }else{
                return {message: this.messages.message.show.fail, code: this.notFound, data: undefined}
            }
        }catch(err){
            return  {message: this.messages.message.show.unprocessable, err: err.message, code: this.unprocessable}
        }
        // return {message: `${this.messages.message.edit.success} with id: ${id}`}
    }

    async store(payload){
        const product = new this.productModel(payload)
            const savedProduct = await product.save()
            return {message: this.messages.message.create.success, data: savedProduct}
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
            
            result = {message: this.messages.message.create.success, data: savedProduct, code: this.created}    
        }catch(err){
            result = {message: this.messages.message.create.fail, err: err.message, code: this.unprocessable}
        }
        return result
}

    urlHandler(url){
        return url.split('/public/')[1];
}
}