
const express = require('express');
const authRoute = express.Router();

const authController = require( '../controllers/auth.controller' );

authRoute.post('/register', authController.register);
authRoute.post('/login', authController.login);
authRoute.post('/refreshToken', authController.refreshTokenVerification);

module.exports = authRoute;