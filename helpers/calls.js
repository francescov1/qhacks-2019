'use strict';
const config = require('../config');
const client = require('../config/twilio');
const querystring = require("querystring");

module.exports = {
  initCall: function(smsReceived, fromNumber) {

    const query = querystring.stringify({ phrase: smsReceived, from: fromNumber });

    return client.calls.create({
      url: `${config.base_url}/api/voice/initialCallHandler?${query}`,
      to: config.emergency_number,
      from: config.twilio.sender_id
    });
  },

  updateCall: function(smsReceived, fromNumber) {

    const query = querystring.stringify({ phrase: smsReceived, from: fromNumber });

    return client.calls(process.env.call_sid).update({
      method: 'POST',
      url: `${config.base_url}/api/voice/updateCallHandler?${query}`
    });
  }
}
