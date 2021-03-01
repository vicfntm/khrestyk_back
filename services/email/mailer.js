const mailOptions = require('../../config/mail.json')
const nm = require('nodemailer')
const templates = require('./templates/index')

module.exports = (to, status, data) => {
    if(to){
        const transporter = nm.createTransport(mailOptions.authentification)
        const {text, subject} = mailOptions.templates[status]
        const from = mailOptions.templates.from
        let params = {
            subject,
            from,
            to
        }
        params.html = replaceTextByTemplate(status, params, data)
        transporter.sendMail(params)
    }
}

function replaceTextByTemplate(status, params, data){
try{
    const templateToRender = templates[status]
    return templateToRender(data)
}catch (err){
    return params
}
}