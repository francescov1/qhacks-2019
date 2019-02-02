'use strict';
const config = require('./config');
const client = require('twilio')(config.twilio.account_sid, config.twilio.auth_token);

client.calls
      .create({
         url: 'https://handler.twilio.com/twiml/EH618b34cbf9ed6c026dd6d189389e1f28',
         to: '+14039928497',
         from: config.twilio.sender_id
       })
      .then(call => console.log(call.sid))
      .done();
