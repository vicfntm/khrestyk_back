const express = require('express');
var cors = require('cors');

const app = express();
// app.use(cors);
const bodyParser = require('body-parser');
require('dotenv').config({path:'variables.env'});

app.use(bodyParser.json());
app.use(express.static('./storage/public'));

const productRoutes = require('./routes/productRoutes');
const sliderRoutes = require('./routes/sliderRoutes');
const formRoutes = require('./routes/consumerFormRoutes');

const handlers = require('./errorHandlers/errHandler')
require('./conn/mongooseConn');
app.use('/api/v1/product', cors(),  productRoutes);
app.use('/api/v1/slider', sliderRoutes);
app.use('/api/v1/admin/consumer-form', formRoutes);
app.get('/', (req, res) => {
res.send('mainpage');
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`SERVER on port ${process.env.SERVER_PORT}`);
});
