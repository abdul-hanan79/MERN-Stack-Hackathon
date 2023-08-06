const express = require('express');
const routes = express.Router();
const { doSignup, doLogin } = require('../controller/userController')

routes.post('/signupUser', doSignup)
routes.post('/loginUser', doLogin)


module.exports = routes;

