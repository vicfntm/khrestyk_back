const express = require('express')
const router = express.Router()
const controller = require('../auth/controllers/authController')
const controllerInstance = new controller()
const hashMaker = require('../middlewares/hasher')
const userFinder = require('../middlewares/authChecker')
const validateToken = require('../middlewares/checkJwt')
const checkRoles = require('../middlewares/roleChecker')
router.post('/create-user',  validateToken, checkRoles('admin'), hashMaker, async(req, res) => {
    const result = await controllerInstance.createUser(req)
    res.json(result)
})
router.post('/login', userFinder, async(req, res) => {
    const token = await controllerInstance.login(req)
    res.json({token: res.locals.token})
})


module.exports = router