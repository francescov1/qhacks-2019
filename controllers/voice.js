'use strict';
const config = require('../config');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

module.exports = {

  // handler to specify what to say and record from 911 operator
  postVoice: function(req, res, next) {
    const smsReceived = req.query.phrase;
    const fromNumber = req.query.from;

    const voice = new VoiceResponse();
    voice.say({ voice: 'alice' }, `911 SMS Service, sent from :${fromNumber}`);

    const gather = voice.gather({
      input: 'speech',
      action: config.local_tunnel + '/api/sms/respond'
    });
    gather.say(smsReceived);

    console.log(voice.toString());

    res.type('text/xml');
    res.send(voice.toString());
  }
}
