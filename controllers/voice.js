'use strict';
const VoiceResponse = require('twilio').twiml.VoiceResponse;

module.exports = {
  postVoice: function(req, res, next) {
    const phrase = req.query.phrase;

    const voice = new VoiceResponse();
    voice.say({ voice: 'alice' }, phrase);

    const gather = voice.gather({
      input: 'speech',
      action: '/api/sms/respond'
    });
    gather.say('Operator ur mom gay');

    console.log(response.toString());

    res.type('text/xml');
    res.send(voice.toString());
  }
}
