'use strict';
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = {

  receiveSms: function(req, res, next) {
    const twiml = new MessagingResponse();

    twiml.message('Fuck bitch shit');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }

}
