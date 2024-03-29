'use strict';
const config = require('../config');
const client = require('../config/twilio');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

module.exports = {

  // handler to specify what to say and record from 911 operator after first sms is sent
  initialCallHandler: function(req, res, next) {
    const smsReceived = req.query.phrase;
    const fromNumberStr = req.query.from

    let fromNumber = "";
    for (let char of fromNumberStr) {
      if (char === "+")
        continue;

      fromNumber += `${char} `
    }

    const voice = new VoiceResponse();
    voice.pause({ length: 2 })
    voice.say({ voice: 'woman' }, `9 1 1 SMS Service, sent from ${fromNumber}.`);
    voice.say({ voice: 'alice' }, smsReceived);

    const gather = voice.gather({
      input: 'speech',
      action: config.base_url + '/api/sms/respond',
      finishOnKey: '#',
      hints: "please provide me with your name and current location, we will send help immediately"
    });
    gather.say({ voice: 'woman' }, "Please give your response followed by the pound key:");

    res.type('text/xml');
    res.send(voice.toString());
  },

  updateCallHandler: function(req, res, next) {
    const smsReceived = req.query.phrase;
    const fromNumber = req.query.from;

    const voice = new VoiceResponse();
    voice.say({ voice: 'woman' }, `Update received.`);
    // TODO: add a pause
    voice.say({ voice: 'alice' }, smsReceived);

    const gather = voice.gather({
      input: 'speech',
      action: config.base_url + '/api/sms/respond',
      finishOnKey: '#',
      hints: "police is on the way, sit tight and try not to make any noise, is there anything we should know to enter the home"
    });
    gather.say({ voice: 'woman' }, "Please give your response followed by the pound key:");

    res.type('text/xml');
    res.send(voice.toString());
  },

  // send a confirmation message back to operator confirming their speech was relayed to the user
  confirmResponseToOperator: function(req, res, next) {
    console.log('sending confirmation to 911 operator of sent message');

    // TODO: set pause to long ass time
    const voice = new VoiceResponse();
    voice.say({ voice: 'woman' }, 'Your message has been received and is being relayed back to the user via SMS.');
    voice.pause({ length: 1000 })
    res.type('text/xml');
    res.send(voice.toString());
  },

  statusCallBack: function(req, res, next) {
    if (req.body.CallStatus !== 'completed')
      return res.send();

    const number = process.env.number;
    delete process.env.number;
    delete process.env.call_sid;

    return client.messages.create({
      body: 'The 911 operator ended the call. If you believe this was a mistake, please reply and a new call will be initiated.',
      from: config.twilio.sender_id,
      to: number
    })
    .then(message => {
      delete process.env.number;
      delete process.env.call_sid;

      return res.send();
    })
    .catch(err => next(err));
  }
}
