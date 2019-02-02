'use strict';
const config = require('../config');
const client = require('twilio')(config.twilio.account_sid, config.twilio.auth_token);
const callHelper = require('../helpers/calls');

module.exports = {

  // this route will not be used when done, only for testing
  post: function(req, res, next) {
    
    // these two values will come from sms sent by user
    const smsReceived = req.query.phrase;
    const fromNumber = req.query.from;

    return callHelper.initCall(smsReceived, fromNumber)
      .then(call => {
        return res.status(200).send()
      })
      .catch(err => next(err));
  }
}
