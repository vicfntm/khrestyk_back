module.exports = data => {
    return `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
    <html>
    <head>
        <title>Your order was changed</title>
    </head>
    <body>
        ${data.msg}
    </body>
    </html>
    
    `
}