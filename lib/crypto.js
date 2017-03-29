'use strict';
const crypto = require('crypto');
const util = require('./util');

module.exports = function Crypto(options) {
  util.enforceNotEmpty(options, 'You must call new Crypto() with an options object.  See doco.');
  const algorithm = util.defaultValue(options.algorithm, 'aes-256-ctr');
  util.enforceNotEmpty(options.key, 'Your options object must have a "key" property');

  let self = {};

  const encryptBuffer = buffer => {
    const cipher = crypto.createCipher(algorithm, options.key);
    const crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
    return crypted;
  };

  const encryptText = text => {
    const cipher = crypto.createCipher(algorithm, options.key);
    let crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
  };

  const decryptText = text => {
    const decipher = crypto.createDecipher(algorithm, options.key);
    let dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
  };

  const decryptBuffer = buffer => {
    const decipher = crypto.createDecipher(algorithm, options.key);
    const dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
    return dec;
  };

  self.encrypt = function(value) {
    return (value instanceof Buffer) ? encryptBuffer(value) : encryptText(value);
  };

  self.decrypt = function(value) {
    return (value instanceof Buffer) ? decryptBuffer(value) : decryptText(value);
  };

  return Object.freeze(self);
};
