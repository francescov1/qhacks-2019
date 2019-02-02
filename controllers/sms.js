'use strict';
const MessagingResponse = require('twilio').twiml.MessagingResponse;

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

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());

  }

}