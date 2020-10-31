const express = require('express')
const router = express.Router()
const controller = require('../controllers/adminController')


router.get('/get-orders', async(req, res) => {
   const c = new controller()
   const index =  await c.index(req)
   res.json(index)
});


module.exports = router;