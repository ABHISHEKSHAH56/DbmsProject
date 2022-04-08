const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/authController')

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.post('/refresh-token', AuthController.refreshToken)

router.delete('/logout', AuthController.logout)
router.post('/password/forget',AuthController.forgotPassword)
router.put("/password/reset/:token",AuthController.resetPassword)

module.exports = router
