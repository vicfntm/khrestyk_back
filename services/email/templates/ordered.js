module.exports = data => {
    return `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html lang="utf-8">
<head>
    <title>Нове замовлення</title>
</head>
<body>
    Зареєстровано запис з id ${data.msg}
</body>
</html>`
}