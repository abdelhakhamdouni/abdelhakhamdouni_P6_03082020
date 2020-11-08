const express = require('express');
const hashPassword = require('../utils/hashPassword');
const tokenController = require('../controllers/tokenController');
const userController = require('../controllers/userController');
const validateController = require('../controllers/validatorController');
const router = express.Router();

router.post('/login', userController.signin, tokenController.send )
router.post('/signup', validateController.email, validateController.password, hashPassword, userController.signup )

module.exports = router