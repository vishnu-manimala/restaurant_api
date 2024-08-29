const express = require('express');
const authRoute = express.Router();

const authController = require( '../controllers/auth.controller' );

authRoute.post('/register', authController.register);



module.exports = authRoute;