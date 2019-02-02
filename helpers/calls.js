'use strict';
const config = require('../config');

// TODO: use node package to urlify
module.exports = {
  initCall: function(smsReceived, fromNumber) {

    while (smsReceived.includes(' '))
      smsReceived = smsReceived.replace(' ', '%20');

    return client.calls.create({
      url: config.local_tunnel + `/api/voice?phrase=${smsReceived}&from=${fromNumber}`,
      to: config.emergency_number,
      from: config.twilio.sender_id
    })
  }
}
