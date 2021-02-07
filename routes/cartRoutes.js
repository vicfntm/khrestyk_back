const express = require('express')
const { BaseController } = require('../controllers/baseController')
const cartController = require('../controllers/cartController')
const router = express.Router()
const cartHandler = new cartController()
const {encodeImage} = require('../middlewares/base64encoder')


router.post('/add-product', encodeImage, async(req, res) => {
    const result = await cartHandler.store(req.body)
   res.status(result.code).json(result)
});

router.get('/all', async (req, res) => {

    const result = await cartHandler.all()

    res.status(200).json(result)
})

module.exports = router;