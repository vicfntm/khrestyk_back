const express = require('express')
const  route = express.Router()
const consumerController = require('../controllers/consumerFormController')
const consumer = new consumerController

route.get('/all', (req, res) => res.json(consumer.index()))
route.get('/:id', (req, res)=> res.json(consumer.single(req.params.id)))

module.exports = route;