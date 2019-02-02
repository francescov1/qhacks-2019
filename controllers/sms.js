'use strict';
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = {

  receiveSms: function(req, res, next) {

    console.log(req.headers)
    console.log(req.body)

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
