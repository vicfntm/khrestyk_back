const express = require('express');
const router = express.Router();

const productJson = require('../dummy/products.json')
const ProductController = require('../controllers/productController')
const product = new ProductController;
const {catchErrors} = require('../errorHandlers/errHandler')
const {upload} = require('../middlewares/fileUploader');
router.get('/all', async (req, res) => {
    res.json(await product.index())
});

 router.get('/single/:id', (req, res) => {
    res.json(product.create(req.params.id))
 });

 router.patch('/edit/:id', (req, res) => {
    res.json(product.update(req.params.id));
 });

 router.post('/store',  async (req, res) => {
    res.json(await product.store(req.body))
 });

 router.post('/store-form-data', upload, async (req, res) => {
   res.json(await product.storeForm(req))
});

router.get('/', (req, res)=>{
    res.send('product')
 });

module.exports = router;