const express = require('express')
const cartController = require('../controllers/cartController')
const router = express.Router()
const cartHandler = new cartController()
const {encodeImage} = require('../middlewares/base64encoder')
const throttle = require('../middlewares/throttle')

router.post('/add-product', throttle, encodeImage, async(req, res) => {
    const result = await cartHandler.store(req.body)
   res.status(result.code).json(result)
})

router.get('/all', async (req, res) => {
    const result = await cartHandler.all()
    res.status(result.code).json(result)
})

router.get('/show/:id', async(req, res) => {
    const result = await cartHandler.show(req.params.id)
    res.status(result.code).json(result)
})

module.exports = router