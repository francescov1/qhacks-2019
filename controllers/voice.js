'use strict';
const config = require('../config');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

module.exports = {
  postVoice: function(req, res, next) {
    const phrase = req.query.phrase;

    const voice = new VoiceResponse();
    voice.say({ voice: 'alice' }, phrase);

    const gather = voice.gather({
      input: 'speech',
      action: config.local_tunnel + '/api/sms/respond'
    });
    gather.say('Operator ur mom gay');

    console.log(voice.toString());

    res.type('text/xml');
    res.send(voice.toString());
  }
}
