const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const db = process.env.MONGO_DB;
const port = process.env.MONGO_PORT;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connection URL
const url = `mongodb://${username}:${password}@${host}:${port}/${db}?authSource=admin&retryWrites=true`;
console.log('URL: ', url);
const shortUrl = `mongodb://${host}:${port}/${db}?authSource=admin`;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false})
    .then(() => {
        console.log('MONGOOSE CONN SUCCESS');
    }).catch(err => {
    console.log('MONGOOSE CONN FAILED', err);
    process.exit();
});