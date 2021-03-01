const mailOptions = require('../../config/mail.json')
const SENT_TO_ADMIN_STATUS = 'ordered'
const NOT_ORDERED_YET = 'started'
const PROCESSED = 'processed'
const DECLINED = 'declined'
const CHANGED = 'changed'
const SENT = 'sent'
const FINISHED = 'finished'
module.exports = (status, userData) => {
    let target;
    switch(status){
        case SENT_TO_ADMIN_STATUS:
            target = mailOptions.mailto_admin
            break
        case NOT_ORDERED_YET:
            target = undefined
            break
        default:
            target = userData
    }
    return target
}