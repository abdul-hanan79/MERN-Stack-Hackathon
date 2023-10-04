const express = require('express');
const routes = express.Router();
const { doSignup, doLogin, doFetchCurrentUser } = require('../controller/userController');
const { verifyUser } = require('../utils/verifyUser');

routes.post('/signupUser', doSignup)
routes.post('/loginUser', doLogin)
routes.get('/fetchCurrentUser', verifyUser, doFetchCurrentUser)


module.exports = routes;

