const mailer = require('./mailer')

module.exports = (transportType) => {

    switch(transportType){
        case 'email':
            return mailer
        case 'viber':
            return 'viber'
        default:
            return 'sms'
    }
}