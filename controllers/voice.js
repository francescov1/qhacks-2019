'use strict';
const VoiceResponse = require('twilio').twiml.VoiceResponse;

module.exports = {
  getVoice: function(req, res, next) {
    const phrase = req.query.phrase;

    const voice = new VoiceResponse();
    voice.say({ voice: 'alice' }, phrase);

    res.type('text/xml');
    res.send(voice.toString());
  }
}
