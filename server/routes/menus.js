const express = require('express');
const router = express.Router();
const { getMenu } = require('../controllers/Menu.js');

router.get('/', getMenu);

module.exports = router;