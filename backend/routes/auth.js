const express               = require('express');
const hashPassword          = require('../utils/hashPassword');
const tokenController       = require('../controllers/tokenController');
const userController        = require('../controllers/userController');
const validateController    = require('../controllers/validatorController');
const router                = express.Router();
const { body, validationResult } = require('express-validator');

/**
 * Authenticattion des users ROUTES
 */

router.post('/login',[
    body('email').isEmail().normalizeEmail(),
    body('password').trim().escape(),
], userController.signin, tokenController.send )
router.post('/signup',[
    body('email').isEmail().normalizeEmail(),
    body('password').trim().escape(),
], validateController.email, validateController.password, hashPassword, userController.signup )

module.exports = router