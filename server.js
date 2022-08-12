const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config({path: 'variables.env'});
const productRoutes = require('./routes/productRoutes');
const sliderRoutes = require('./routes/sliderRoutes');
const formRoutes = require('./routes/consumerFormRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderProcessingRoutes = require('./routes/orderProcessingRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./config/swagger.yaml');
const amqp = require('amqplib/callback_api');
require('multer')();
const winston = require('./loggers/logging');
app.use(cors({origin: '*', credentials: true}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static('./storage/public'));
const cookieParser = require('cookie-parser');
const Redis = require("ioredis");
const authMiddleware = require('./middlewares/jwtExist');
const authRoutes = require('./routes/authRoutes');
app.use(cookieParser());
app.use('/v1/product', productRoutes);
app.use('/v1/slider', sliderRoutes);
app.use('/v1/admin/consumer-form', formRoutes);
app.use('/v1/cart', cartRoutes);
app.use('/v1/order-processing', orderProcessingRoutes);
app.use('/v1/jwt-policy', authRoutes);

app.use('/v1/admin/product', authMiddleware, productRoutes);
app.use('/v1/admin/order-processing', authMiddleware, orderProcessingRoutes);
app.use('/api/v1/order', authMiddleware, adminRoutes);

app.get('/', async (req, res) => {
    res.send('mainpage');
});

const ent = app.listen(process.env.SERVER_PORT, () => {
    winston.info(`SERVER on port ${process.env.SERVER_PORT}`);
});

amqp.connect(`amqp://${process.env.RABBIT_LOGIN}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}/auth_tokens`,  (connectEror, connection) => {
    if (connectEror) {
        throw connectEror;
    }
    connection.createChannel( (channelError, channel)=> {
        if (channelError) {
            throw channelError;
        }
        const queue = 'tokens';
        channel.assertQueue(queue, {
            durable: false
        });
        console.log(" [*] Rabbitmq waiting for messages in %s.", queue);
        channel.consume(queue, async (msg) =>{
            token =  msg.content.toString();
            tokenDecode = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);
            await redis.set(token, token)
            await redis.expireat(token, tokenDecode.exp)
        }, {
            noAck: true
        });
    });
});

app.use( (err, req, res, next) =>  {
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

module.exports = ent
