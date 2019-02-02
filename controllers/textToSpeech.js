'use strict';
const config = require('../config');
const client = require('twilio')(config.twilio.account_sid, config.twilio.auth_token);

module.exports = {
  post: function(req, res, next) {
    let phrase = req.query.phrase;
    while (phrase.includes(' '))
      phrase = phrase.replace(' ', '%20');

    client.calls.create({
      url: config.local_tunnel + `/api/voice?phrase=${phrase}`,
      to: '+14164535790',
      from: config.twilio.sender_id
    })
    .then(call => {
      console.log(call.sid);
      return res.status(200).send()
    })
    .catch(err => next(err));
  }
}
