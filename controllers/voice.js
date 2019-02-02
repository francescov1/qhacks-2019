'use strict';
const VoiceResponse = require('twilio').twiml.VoiceResponse;

module.exports = {
  postVoice: function(req, res, next) {
    const phrase = req.query.phrase;
    console.log('HEY WE GOT HERE');

    const voice = new VoiceResponse();
    voice.say({ voice: 'alice' }, phrase);

    res.type('text/xml');
    res.send(voice.toString());
  }
}
