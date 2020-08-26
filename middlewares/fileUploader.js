const multer = require('multer')
const {v4} = require('uuid')

const storage = multer.diskStorage({
    destination: function (req, file, next) {
      next(null, 'storage/public/images/')
    },
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if(isPhoto){
            next(null, true);
        }else{
            next({'message': 'that  filetype is not allowed'}, false);
        }
    },
    filename: function (req, file, next) {
      next(null, `${v4()}.${file.mimetype.split('/')[1]}`)
    }
  })


exports.upload = multer({storage}).any('images', 50);