const { product } = require("../models/imports")
const fs = require('fs')
const { dir } = require("console")
const winston = require('winston')
path = require('path')

const encoder = (req, res, next) => {

    if(req.body.hasOwnProperty('products') && req.body.products.length > 0){
        for(const elem of req.body.products){
            if(elem.images.length > 0){
                try{
                    elem.images.map((imageData, k) => {
                        const convertedImage = base64Convertor(makeAbsolutePath(imageData.url));
                        if(convertedImage !== undefined){
                            imageData.image = convertedImage;
                        }

                    })
                }catch(err){
                    winston.error(err)
                }
            }
        }
    }
    next()
}

function makeAbsolutePath(image){
    try{
        return path.dirname(require.main.filename) + `/storage/public/images/${image.split('/').slice(-1)[0]}`;
    }catch(err){
        return undefined;
    }
}
function base64Convertor(absolutePath){
    try{
        const binary = fs.readFileSync(absolutePath)
        return binary.toString('base64')
    }catch(err){
        winston.error('cant convert image to base64')
        return undefined
    }
    
}

exports.encodeImage = encoder