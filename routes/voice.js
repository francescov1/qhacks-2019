'use strict';
const express = require('express');
const controller = require('../controllers/voice');
const router = express.Router();

router.post('/', controller.postVoice);

module.exports = router;
