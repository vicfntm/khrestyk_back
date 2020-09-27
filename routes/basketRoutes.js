const express = require('express');
const { BaseController } = require('../controllers/baseController');
const basketController = require('../controllers/basketController');
const router = express.Router();
const backetController = require('../controllers/basketController')
const basketHandler = new basketController()

router.post('/add-product', async(req, res) => {
    const result = res.send(await basketHandler.store(req.body))
   res.status(result.code).json(result)
});


module.exports = router;