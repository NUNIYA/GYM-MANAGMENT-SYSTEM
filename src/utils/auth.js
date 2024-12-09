const crypto = require('crypto');

exports.generateTempPassword = () => {
  return crypto.randomBytes(4).toString('hex');
};