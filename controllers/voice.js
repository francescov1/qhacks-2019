'use strict';
const config = require('../config');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

module.exports = {

  // handler to specify what to say and record from 911 operator after first sms is sent
  initialCallHandler: function(req, res, next) {
    const smsReceived = req.query.phrase;
    const fromNumber = req.query.from;

    const voice = new VoiceResponse();
    voice.say({ voice: 'woman' }, `911 SMS Service, sent from :${fromNumber}`);
    // TODO: add a pause
    voice.say({ voice: 'alice' }, smsReceived);

    // TODO: add exact phrase we are expecting from 911 operator after sms sent to them
    const gather = voice.gather({
      input: 'speech',
      action: config.base_url + '/api/sms/respond',
      finishOnKey: '#',
      hints: "emergency, location, danger"
    });
    gather.say({ voice: 'woman' }, "Please say your response followed by the pound key:");

    // TODO: add voice that says: ur message has been recorded and is being replayed back

    res.type('text/xml');
    res.send(voice.toString());
  },

  // send a confirmation message back to operator confirming their speech was relayed to the user
  confirmResponseToOperator: function(req, res, next) {
    console.log('sending confirmation to 911 operator of sent message');

    const voice = new VoiceResponse();
    voice.say({ voice: 'woman' }, 'Your message has been received and is being relayed back to the user via SMS. their response will be sent back to you.');
    res.type('text/xml');
    res.send(voice.toString());
  }
}
