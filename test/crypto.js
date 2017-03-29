'use strict';
const Crypto = require('../');
const should = require('should');

describe('Crypto', () => {
  let crypto;
  before(() => {
    crypto = new Crypto({
      key: 'secretkey'
    });
  });

  it('shouldnt be able to decrypt with another password', () => {
    const value = 'hide me';
    const encrypted = crypto.encrypt(value);

    const crypto2 = new Crypto({ key: 'anotherkey' });
    const decrypted = crypto2.decrypt(encrypted);
    should(decrypted).not.eql(value);
  });

  it('should encrypt and decrypt text', () => {
    const value = 'hide me';
    const encrypted = crypto.encrypt(value);
    should(value).not.eql(encrypted);
    const decrypted = crypto.decrypt(encrypted);
    should(decrypted).eql(value);
  });

  it('should encrypt and decrypt buffers', () => {
    const text = 'hide me';
    const value = new Buffer(text, 'utf8');
    const encrypted = crypto.encrypt(value);
    should(value).not.eql(encrypted);
    const decrypted = crypto.decrypt(encrypted);
    should(decrypted.toString('utf8')).eql(text);
  });

});
