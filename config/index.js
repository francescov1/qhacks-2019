'use strict';
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  node_env: process.env.NODE_ENV || 'development',
  base_url: process.env.BASE_URL,
  twilio: {
    account_sid: process.env.TWILIO_ACCOUNT_SID,
    auth_token: process.env.TWILIO_AUTH_TOKEN,
    sender_id: process.env.TWILIO_SENDER_ID
  },
  emergency_number: process.env.EMERGENCY_NUMBER
};
