'use strict';
const express = require('express');
const controller = require('../controllers/sms');
const router = express.Router();

router.post('/receive', controller.receiveSms);
router.post('/respond', controller.respondToUser);

module.exports = router;
