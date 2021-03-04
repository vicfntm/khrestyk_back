const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config({path:'variables.env'});
const productRoutes = require('./routes/productRoutes');
const sliderRoutes = require('./routes/sliderRoutes');
const formRoutes = require('./routes/consumerFormRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderProcessingRoutes = require('./routes/orderProcessingRoutes')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./config/swagger.yaml');
const multer = require('multer')()
require('./conn/mongooseConn');
const ml = require('./services/email/mailer')
const authRoutes = require('./routes/authRoutes')
app.use(cors({origin: '*', credentials: true}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static('./storage/public'));

// const handlers = require('./errorHandlers/errHandler')
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/slider', sliderRoutes);
app.use('/api/v1/admin/consumer-form', formRoutes);
app.use('/api/v1/cart', cartRoutes)
app.use('/api/v1/order-processing', orderProcessingRoutes)
app.use('/api/v1/auth', authRoutes)
app.get('/', (req, res) => {
    // ml('4944995@gmail.com', 'ordered')
    res.send('mainpage');
    });
app.use('/api/v1/order', adminRoutes);

app.use(function (err, req, res, next) {
    console.log(app.get('env'))
    res.status(500).json({message: err.message})

})
app.listen(process.env.SERVER_PORT, () => {
    console.log(`SERVER on port ${process.env.SERVER_PORT}`);
});
