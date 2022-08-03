const express = require('express')
const router = express.Router()
// const controller = require('../auth/controllers/authController')
// const controllerInstance = new controller()
// const hashMaker = require('../middlewares/hasher')
// const userFinder = require('../middlewares/authChecker')
// const validateToken = require('../middlewares/checkJwt')
// const checkRoles = require('../middlewares/roleChecker')
const authMiddleware = require('../middlewares/jwtExist');

// router.post('/create-user', validateToken, checkRoles('admin'), hashMaker, async (req, res) => {
//     const result = await controllerInstance.createUser(req)
//     res.status(result.code).json(result)
// })
router.get('/token-exist', authMiddleware, (req, res) => {
    res.json({message: "ok"})
})


module.exports = router