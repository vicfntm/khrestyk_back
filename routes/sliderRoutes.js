const express = require('express')
const router = express.Router()
const sliderController = require('../controllers/sliderController')
const slider = new sliderController

router.get('/all', (req, res) => res.json(slider.index()))
router.patch('/edit/:id', (req, res) => res.json(slider.edit(req.params.id)))
router.post('/store', (req, res) => res.json(slider.store()))
module.exports = router;