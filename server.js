const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors({origin: '*', credentials: true}));
const bodyParser = require('body-parser');
require('dotenv').config({path:'variables.env'});
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./config/swagger.yaml');
app.use(bodyParser.json());
const multer = require('multer')()
require('./conn/mongooseConn');
app.use(express.urlencoded({extended: true}))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static('./storage/public'));

const productRoutes = require('./routes/productRoutes');
const sliderRoutes = require('./routes/sliderRoutes');
const formRoutes = require('./routes/consumerFormRoutes');
const basketRoutes = require('./routes/basketRoutes')
// const handlers = require('./errorHandlers/errHandler')
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/slider', sliderRoutes);
app.use('/api/v1/admin/consumer-form', formRoutes);
app.use('/api/v1/basket', basketRoutes)
app.get('/', (req, res) => {
    res.send('mainpage');
    });

app.listen(process.env.SERVER_PORT, () => {
    console.log(`SERVER on port ${process.env.SERVER_PORT}`);
});
