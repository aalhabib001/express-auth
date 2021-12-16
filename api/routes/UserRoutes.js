// noinspection JSCheckFunctionSignatures

const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController')

router.post('/login', userController.loginController)

router.post('/register', userController.registerController)

router.get('/',userController.getUser)

module.exports = router
