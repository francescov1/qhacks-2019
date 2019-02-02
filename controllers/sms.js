'use strict';
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const callHelper = require('../helpers/calls');
const config = require('../config');

module.exports = {

  receiveSms: function(req, res, next) {
    process.env.number = req.body.From;
    process.env.smsSid = req.body.SmsMessageSid;
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

    // check if a call is ongoing
    if (process.env.call_sid) {
      // update the call with new info
      
    } else {
      // make a new call
      callHelper.initCall(message, process.env.number)
        .then(call => {
          res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());
        });
    }
  },

  // 911 operator sent response, need to forward in sms format to user here
  respondToUser: function(req, res, next) {
    const message = req.body.SpeechResult;
    const confidence = req.body.Confidence

    // TODO: send response to user
    console.log('sending response from 911 to user');
    console.log('confidence: ' + confidence);
    console.log('message: ' + message);

    return client.calls(process.env.callSid)
      .update({ method: 'POST', url: config.base_url + '/api/voice/confirmResponseToOperator' })
      .then(call => {
        return res.send();
      })
      .catch(err => next(err));
  }

}
