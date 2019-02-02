'use strict';
const express = require('express');
const controller = require('../controllers/voice');
const router = express.Router();

router.post('/initialCallHandler', controller.initialCallHandler);
router.post('/updateCallHandler', controller.updateCallHandler);
router.post('/confirmResponseToOperator', controller.confirmResponseToOperator);

module.exports = router;
