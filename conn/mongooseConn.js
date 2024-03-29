const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const db = process.env.MONGO_DB;
const port = process.env.MONGO_PORT;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const winston = require('../loggers/logging')

// Connection URL
const url = `mongodb://${username}:${password}@${host}:${port}/${db}?authSource=admin&retryWrites=true`;
winston.debug(`URL: ${url}`);
const shortUrl = `mongodb://${host}:${port}/${db}?authSource=admin`;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false})
    .then(() => {
        winston.info(`MONGOOSE CONN SUCCESS to DB ${db}`);
    }).catch(err => {
    winston.error('MONGOOSE CONN FAILED', err);
    process.exit();
});
module.exports = mongoose