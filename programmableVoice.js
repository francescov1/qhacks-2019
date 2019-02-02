'use strict';
const config = require('./config');
const client = require('twilio')(config.twilio.account_sid, config.twilio.auth_token);

client.calls
      .create({
         url: 'http://demo.twilio.com/docs/voice.xml',
         to: '+123456789',
         from: '+987654321'
       })
      .then(call => console.log(call.sid))
      .done();
