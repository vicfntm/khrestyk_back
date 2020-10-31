const express = require('express')
const { BaseController } = require('../controllers/baseController')
const basketController = require('../controllers/basketController')
const router = express.Router()
const backetController = require('../controllers/basketController')
const basketHandler = new basketController()
const {encodeImage} = require('../middlewares/base64encoder')


router.post('/add-product', encodeImage, async(req, res) => {
    const result = await basketHandler.store(req.body)
   res.status(result.code).json(result)
});


module.exports = router;