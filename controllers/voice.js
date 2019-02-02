'use strict';
const VoiceResponse = require('twilio').twiml.VoiceResponse;

module.exports = {
  postVoice: function(req, res, next) {
    const phrase = req.body.phrase;

    const voice = new VoiceResponse();
    voice.say({ voice: 'alice' }, phrase);

    res.type('text/xml');
    res.send(voice.toString());
  }
}
