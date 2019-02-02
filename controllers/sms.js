'use strict';
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const client = require('../config/twilio');
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
      console.log('updating onging call')
      // update the call with new info
      return callHelper.updateCall(message, process.env.number)
        .then(call => {
          return res.end()
        })
        .catch(err => next(err))

    } else {
      console.log('starting new call')
      const twiml = new MessagingResponse();

      // TODO: research info required and specify here
      // TODO: may not want to reply, because if user sends another text
      // while operator is hearing the first text the call flow may get weird (test this out)
      twiml.message('911 SMS Service: \nWe have received your message and are contacting 911. Find a safe location and turn your phone to silent if you are in a sound-sensitive situation. We will respond shortly.');

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

    console.log('sending response from 911 to user');
    console.log('message: ' + message);
    console.log('current call sid: ' + process.env.call_sid)

    // send back sms to user and update operator that their message was received
    return Promise.all([
      client.messages.create({
        body: `Message from 911 operator:\n${message}`,
        from: config.twilio.sender_id,
        to: process.env.number
      }),
      client.calls(process.env.call_sid).update({
        method: 'POST',
        url: `${config.base_url}/api/voice/confirmResponseToOperator`
      })
    ])
    .then(results => {
      return res.send();
    })
    .catch(err => next(err));
  }

}
