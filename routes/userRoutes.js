const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/userController');
console.log("3 step");
router.post('/register',register);
console.log("4 step");
router.post('/login',login);

module.exports = router;