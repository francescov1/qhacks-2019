'use strict';
const config = require('../config');
const client = require('twilio')(config.twilio.account_sid, config.twilio.auth_token);

module.exports = {
  post: function(req, res, next) {
    const phrase = req.body.phrase;

    client.calls.create({
      url: config.local_tunnel + `:3000/voice?phrase=${phrase}`,
      to: '+4164535790',
      from: config.twilio.sender_id
    })
    .then(call => res.status(200).send());
  }
}
