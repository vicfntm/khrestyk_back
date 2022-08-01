const Redis = require("ioredis");
const MESSAGE_NON_EXIST = 'jwt must be provided';
const MESSAGE_INCORRECT_STRUCTURE = 'jwt has incorrect structure';
const MESSAGE_NO_JWT = 'jwt not exist';

module.exports = async (req, res, next) => {
        jwt = req.get('authorization');
        if( typeof jwt === 'undefined'){
            throw new Error(MESSAGE_NON_EXIST);
        }
        const tokenArr = jwt.split(' ');
        if(tokenArr.length !== 2){
            throw new Error(MESSAGE_INCORRECT_STRUCTURE);
        }

        const token = tokenArr[1];
        const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);

        tokenExist = await redis.get(token);
        if( tokenExist === null){
            throw new Error(MESSAGE_NO_JWT);
        }

        next();
}