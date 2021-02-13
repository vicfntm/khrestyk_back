const express = require('express')
const router = express.Router()
const controller = require('../orderProcessing/controllers/orderProcessingController')
const orderProcessingInstance = new controller()

router.patch("/:id/:status", (rec, res) => {
    const result = orderProcessingInstance.updateOrder(rec)
    return res.send(result)
})

module.exports = router