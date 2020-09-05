
const {BaseController} = require('./baseController')
const {ObjectID} = require('mongodb')
// const { delete } = require('../routes/sliderRoutes')
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
                return {message: this.messages.message.show.success, code: this.accepted, data: {product: singleElem, categories: [...categories]}}
            }else{
                return {message: this.messages.message.show.fail, code: this.notFound, data: null }
            }
        }catch(err){
            return  {message: this.messages.message.show.unprocessable, err: err.message, code: this.unprocessable}
        }
    }

    defineProperty(target, param){
        return target.hasOwnProperty(param) ? target[param] : undefined
    }

    async update(req){
        
        try{
            let images,
                singleElem;
        if(req.files.length > 0){
            images = req.files.map((file, i) => {
                const imgs = {...req.body.images[i]}
                const alt = this.defineProperty(imgs, 'alt')
                const url = this.urlHandler(file.path) ? this.urlHandler(file.path) : undefined
                const isMain = this.defineProperty(imgs, 'is_main')
                const _id = this.defineProperty(imgs, '_id')
                const core = {}
                if(alt) core.alt = alt
                if(url) core.url = url
                if(isMain) core.is_main = isMain
                if(_id) core._id = _id
                return core
            }) 
            delete req.body.images

        }
        if(images.length !== 0){
            const oldImg = images.filter(i => i.hasOwnProperty('_id')).map(async a => {
                await (await this.connect).collection('products').findOneAndUpdate(
                    {'images._id': a._id},
                    {$set: {'images.$': a},
                     $inc: {__v: 1}
                    },
                    { upsert: false})
            })
            const mewImg = images.filter(i => !i.hasOwnProperty('_id')).map(async b => {
                await (await this.connect).collection('products').findOneAndUpdate(
                    {"_id": new ObjectID(req.params.id)},
                    {$push: {'images': {...b, ...{_id: new ObjectID()}}},
                     $inc: {__v: 1}
                    },
                    { upsert: false})
            })
            if(Object.keys(req.body).length > 0){
                singleElem = await (await this.connect).collection('products').findOneAndUpdate(
                    {"_id": new ObjectID(req.params.id)},
                    {$set: {...req.body, ...{'updatedAt': new Date()}}, $inc: {__v: 1}},
                    { upsert: false})
            }

        }


        if(singleElem){ 
                return {message: this.messages.message.show.success, code: this.accepted, data: singleElem.value} 
            }else{
                return {message: this.messages.message.show.fail, code: this.notFound, data: null}
            }
        }catch(err){
            return  {message: this.messages.message.show.unprocessable, err: err.message, code: this.unprocessable}
        }
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