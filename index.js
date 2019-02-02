'use strict';
Promise = require('bluebird');
const config = require('./config');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('morgan');

const router = require('./router.js');

const app = express();

app.use(logger('dev'));

app.use(helmet());
app.use(bodyParser.json());

router(app);

app.listen(config.port, () => {
  console.log(`server listening on port ${config.port}...`)
});
