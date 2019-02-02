'use strict';
const config = require('../config');
const client = require('twilio')(config.twilio.account_sid, config.twilio.auth_token);

module.exports = {
  post: function(req, res, next) {
    const phrase = req.query.phrase;

    client.calls.create({
      url: config.local_tunnel + `/api/voice?phrase=${phrase}`,
      to: '+14164535790',
      from: config.twilio.sender_id
    })
    .then(call => res.status(200).send());
  }
}
