'use strict';
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const callHelper = require('../helpers/calls');
const config = require('../config');

module.exports = {

  receiveSms: function(req, res, next) {
    process.env.number = req.body.From;
    process.env.sms_sid = req.body.SmsMessageSid;
    const message = req.body.Body;
    console.log('message: ' + message);

    // check if a call is ongoing
    if (process.env.call_sid) {
      // update the call with new info
      return callHelper.updateCall(message, process.env.number)
        .then(call => {
          return res.end()
        })
        .catch(err => next(err))

    } else {

      const twiml = new MessagingResponse();

      // TODO: research info required and specify here
      // TODO: may not want to reply, because if user sends another text
      // while operator is hearing the first text the call flow may get weird (test this out)
      twiml.message(`911 Text Service:\n
    We have received your message and are contacting 911.

    Please ensure you have provided the following information:
      - Address
      - Current situation
      - Emergency status
      `);

      // make a new call
      return callHelper.initCall(message, process.env.number)
        .then(call => {
          process.env.call_sid = call.sid;

          res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());
        })
        .catch(err => next(err))
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

    console.log('current call sid: ' + process.env.call_sid)
    return client.calls(process.env.call_sid).update({
      method: 'POST',
      url: `${config.base_url}/api/voice/confirmResponseToOperator`
    })
    .then(call => {
      return res.send();
    })
    .catch(err => next(err));
  }

}
