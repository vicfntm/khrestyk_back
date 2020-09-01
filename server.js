const express = require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config({path:'variables.env'});
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./config/swagger.yaml');
app.use(bodyParser.json());
const multer = require('multer')()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static('./storage/public'));

const productRoutes = require('./routes/productRoutes');
const sliderRoutes = require('./routes/sliderRoutes');
const formRoutes = require('./routes/consumerFormRoutes');
// const handlers = require('./errorHandlers/errHandler')
// require('./conn/mongooseConn');
app.use('/api/v1/product', cors(), multer.any('images', 50), productRoutes);
app.use('/api/v1/slider', sliderRoutes);
app.use('/api/v1/admin/consumer-form', formRoutes);
app.get('/', (req, res) => {
    res.send('mainpage');
    });

app.listen(process.env.SERVER_PORT, () => {
    console.log(`SERVER on port ${process.env.SERVER_PORT}`);
});
