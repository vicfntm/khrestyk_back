const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config({path: 'variables.env'})
const productRoutes = require('./routes/productRoutes')
const sliderRoutes = require('./routes/sliderRoutes')
const formRoutes = require('./routes/consumerFormRoutes')
const cartRoutes = require('./routes/cartRoutes')
const adminRoutes = require('./routes/adminRoutes')
const orderProcessingRoutes = require('./routes/orderProcessingRoutes')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./config/swagger.yaml')
require('multer')()
require('./loggers/winstonLogs')
// const event = require('./server').event
// require('./conn/mongooseConn')
const authRoutes = require('./routes/authRoutes')
app.use(cors({origin: '*', credentials: true}));
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static('./storage/public'));
// const {setAsync, getAsync} = require('./conn/redisConn')
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(cookieParser())
const sessConfig = require('./config/session.json')
app.use(session(sessConfig))
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/slider', sliderRoutes);
app.use('/api/v1/admin/consumer-form', formRoutes);
app.use('/api/v1/cart', cartRoutes)
app.use('/api/v1/order-processing', orderProcessingRoutes)
app.use('/api/v1/auth', authRoutes)
app.get('/', async (req, res) => {
    // event.emit('evEmitted', req.headers)
    res.send('mainpage')
})
app.use('/api/v1/order', adminRoutes);


app.use(function (err, req, res, next) {
    let status;
    switch (err.message) {
        case 'not permitted':
        case  'invalid signature':
        case 'jwt expired':
            status = 403
            break
        case 'jwt must be provided':
            status = 401
            break
        default:
            status = 500
    }
    res.status(status).json({message: err.message})
})
// const event = require('events')
// const emitter = new event()
// emitter.on('evEmitted', (event) =>  {
//     console.log(event)
// })
// module.exports.event = emitter
// const {app} = require('./app')

const ent = app.listen(process.env.SERVER_PORT, () => {
    console.log(`SERVER on port ${process.env.SERVER_PORT}`);
});

module.exports = ent
