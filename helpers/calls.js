'use strict';
const config = require('../config');
const client = require('twilio')(config.twilio.account_sid, config.twilio.auth_token);

// TODO: use node package to urlify
module.exports = {
  initCall: function(smsReceived, fromNumber) {

    while (smsReceived.includes(' '))
      smsReceived = smsReceived.replace(' ', '%20');

    return client.calls.create({
      url: config.base_url + `/api/voice/initialCallHandler?phrase=${smsReceived}&from=${fromNumber}`,
      to: config.emergency_number,
      from: config.twilio.sender_id
    })
  }
}
