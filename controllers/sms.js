'use strict';
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const callHelper = require('../helpers/calls');

module.exports = {

  receiveSms: function(req, res, next) {
    process.env.number = req.body.From;
    process.env.sid = req.body.SmsMessageSid;
    const message = req.body.Body;
    console.log('message: ' + message);

    const twiml = new MessagingResponse();

    twiml.message(`911 Text Service:\n
  We have received your message and are contacting 911.

  Please ensure you have provided the following information:
    - Address
    - Current situation
    - Emergency status
    `);

    // call textToSpeach


    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());

  },

  respondToUser: function(req, res, next) {
    console.log('received response from 911, sending back to user')
    console.log(req.body)
    return res.send();
  }

}
