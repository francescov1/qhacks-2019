'use strict';
const config = require('../config');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

module.exports = {

  // handler to specify what to say and record from 911 operator
  postVoice: function(req, res, next) {
    const smsReceived = req.query.phrase;
    const fromNumber = req.query.from;

    const voice = new VoiceResponse();
    voice.say({ voice: 'woman' }, `911 SMS Service, sent from :${fromNumber}`);
    // TODO: add a pause
    voice.say({ voice: 'alice' }, smsReceived);

    // TODO: add exact phrase we are expecting from 911 operator after sms sent to them
    const gather = voice.gather({
      input: 'speech',
      action: config.local_tunnel + '/api/sms/respond',
      finishOnKey: '#',
      hints: "emergency, location, danger"
    });
    gather.say({ voice: 'woman' }, "Please say your response followed by the pound key:");

    console.log(voice.toString());

    res.type('text/xml');
    res.send(voice.toString());
  }
}
