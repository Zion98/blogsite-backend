var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');

const { signUpUser, signInUser } = authController;

//REGISTER
router.post('/register', signUpUser);

// SIGN-IN
console.log("enter here")
router.post('/login', signInUser);

module.exports = router;
