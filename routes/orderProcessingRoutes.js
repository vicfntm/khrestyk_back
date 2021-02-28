const express = require('express')
const router = express.Router()
const controller = require('../orderProcessing/controllers/orderProcessingController')
const orderProcessingInstance = new controller()

router.patch("/:id/:status", async(rec, res) => {
    const result = await orderProcessingInstance.updateOrder(rec)
    res.status(result.code).json(result)
})

module.exports = router