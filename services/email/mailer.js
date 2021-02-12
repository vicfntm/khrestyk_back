const mailOptions = require('../../config/mail.json')
const nm = require('nodemailer')
const fs = require("fs")

module.exports = (to, status) => {
    const transporter = nm.createTransport(mailOptions.authentification)
    const {text, subject} = mailOptions.templates[status]
    const from = mailOptions.templates.from
    let params = {
        text,
        subject,
        from,
        to
    }
    params = replaceTextByTemplate(status, params)
    transporter.sendMail(params)
}

function replaceTextByTemplate(status, params){
try{
    const file = fs.readFileSync( `${__dirname}/templates/${status}.html`)
    params.html = file.toString()
    delete params.text
    return params
}catch (err){
    return params
}
}