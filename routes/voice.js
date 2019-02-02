'use strict';
const express = require('express');
const router = express.Router();

router.get('/', controller.getVoice);

module.exports = router;
