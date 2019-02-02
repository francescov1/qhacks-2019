'use strict';
const express = require('express');
const controller = require('../controllers/voice');
const router = express.Router();

router.get('/', controller.getVoice);

module.exports = router;
