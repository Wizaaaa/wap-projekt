const express = require('express');
const router = express.Router();
const { login } = require('../controllers/Auth.js');

router.post('/login', login);

module.exports = router;