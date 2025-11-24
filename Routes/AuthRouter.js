const express = require('express');
const { signupValidation, loginValidation } = require('../middlewares/authvalidation');
const {  signup, login } = require('../controllers/authController');
const router = express.Router();

router.post('/login', loginValidation,login)

router.post('/signup', signupValidation,signup)
module.exports = router;