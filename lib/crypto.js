'use strict';
/*jshint bitwise: false*/
const crypto = require('crypto');
const util = require('./util');

module.exports = function Crypto(options) {
  util.enforceArgs(options, ['key', 'hmacKey']);

  let self = {};
  const algo = 'aes-256-ctr';
  const hmacAlgo = 'sha256';
  const key = Buffer.from(options.key, 'hex');
  const hmacKey = Buffer.from(options.key, 'hex');

  const constantTimeCompare = function (val1, val2) {
    var sentinel;
    if (val1.length !== val2.length) {
      return false;
    }
    for (var i = 0; i <= (val1.length - 1); i++) {
      sentinel |= val1.charCodeAt(i) ^ val2.charCodeAt(i);
    }
    return sentinel === 0;
  };

  const encrypt = function (plainText) {
    var IV = new Buffer(crypto.randomBytes(16));
    var cipherText;
    var hmac;
    var encryptor;

    encryptor = crypto.createCipheriv(algo, key, IV);
    encryptor.setEncoding('hex');
    encryptor.write(plainText);
    encryptor.end();

    cipherText = encryptor.read();

    hmac = crypto.createHmac(hmacAlgo, hmacKey);
    hmac.update(cipherText);
    hmac.update(IV.toString('hex'));

    return `${cipherText}|${IV.toString('hex')}|${hmac.digest('hex')}`;
  };

  const decrypt = function (cipherText) {
    var cipherBlob = cipherText.split('|');
    var ct = cipherBlob[0];
    var IV = new Buffer(cipherBlob[1], 'hex');
    var hmac = cipherBlob[2];
    var decryptor;

    const chmac = crypto.createHmac(hmacAlgo, hmacKey);
    chmac.update(ct);
    chmac.update(IV.toString('hex'));

    if (!constantTimeCompare(chmac.digest('hex'), hmac)) {
      throw new Error('Encrypted Blob has been tampered with.');
    }

    decryptor = crypto.createDecipheriv(algo, key, IV);
    const decryptedText = decryptor.update(ct, 'hex', 'utf8');
    return decryptedText + decryptor.final('utf-8');
  };

  self.encrypt = function(arg) {
    return encrypt(arg);
  };

  self.decrypt = function(arg) {
    return decrypt(arg);
  };

  return self;
};
