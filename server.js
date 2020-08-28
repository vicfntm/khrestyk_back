const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config({path:'variables.env'});
// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
var cors = require('cors');
app.use(cors);
app.use(bodyParser.json());
app.use(express.static('./storage/public'));

const productRoutes = require('./routes/productRoutes');
const sliderRoutes = require('./routes/sliderRoutes');
const formRoutes = require('./routes/consumerFormRoutes');

const handlers = require('./errorHandlers/errHandler')
require('./conn/mongooseConn');


// // Extended https://swagger.io/specification/#infoObject
// const swaggerOptions = {
//     swaggerDefinition: {
//         basePath: '/',
//         info: {
//             title: "Shop-API",
//             description: "Shop endpoints, standard requests & responses",
//             contact: {
//                 name: "Dev"
//             },
//             servers: ["http://localhost:3000"]
//         }
//     }, 
//     apis: ["server.js"]
// }

// const swaggerDocs = swaggerJsDoc(swaggerOptions);

// app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/slider', sliderRoutes);
app.use('/api/v1/admin/consumer-form', formRoutes);
app.get('/', (req, res) => {
res.send('mainpage');
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`SERVER on port ${process.env.SERVER_PORT}`);
});
