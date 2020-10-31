const { product } = require("../models/imports")
const fs = require('fs')
const { dir } = require("console")
path = require('path')

const encoder = (req, res, next) => {

    if(req.body.hasOwnProperty('products') && req.body.products.length > 0){
        for(const elem of req.body.products){
            if(elem.images.length > 0){
                try{
                    elem.images.map(imageData => {
                        const abspath = makeAbspath(imageData.image)
                        imageData.baseCode =  base64Convertor(abspath)
                    })
                }catch(err){
                    console.log(err)
                }
            }
        }
    }
    next()
}

function makeAbspath(image){
    return path.dirname(require.main.filename) + `/storage/public/images/${image.split('/').slice(-1)[0]}`;
}
function base64Convertor(abspath){
    try{
        binary = fs.readFileSync(abspath)
        return binary.toString('base64')
    }catch(err){
        console.log('cant convert image to base64')
        return 'not converted'
    }
    
}

exports.encodeImage = encoder