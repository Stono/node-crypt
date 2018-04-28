'use strict';
const Crypto = require('../');
const should = require('should');

describe('Crypto', () => {
  let crypto1, crypto2;
  before(() => {
    // require('crypto').randomBytes(32).toString('hex');
    const options = {
      key: 'b95d8cb128734ff8821ea634dc34334535afe438524a782152d11a5248e71b01',
      hmacKey: 'dcf8cd2a90b1856c74a9f914abbb5f467c38252b611b138d8eedbe2abb4434fc'
    };
    crypto1 = new Crypto(options);
    crypto2 = new Crypto(options);
  });

  it('shouldnt be able to decrypt with another password', () => {
    const value = 'hide me';
    const encrypted = crypto1.encrypt(value);
    const options = {
      key: Buffer.from('a95d8cb128734ff8821ea634dc34334535afe438524a782152d11a5248e71b01', 'hex'),
      hmacKey: Buffer.from('acf8cd2a90b1856c74a9f914abbb5f467c38252b611b138d8eedbe2abb4434fc', 'hex')
    };
    const anotherCrypto = new Crypto(options);

    should(() => {
      anotherCrypto.decrypt(encrypted);
    }).throw(/tampered with/);
  });

  it('should encrypt and decrypt text', () => {
    const value = 'hide me';
    const encrypted = crypto1.encrypt(value);
    const decrypted = crypto2.decrypt(encrypted);
    should(decrypted).eql(value);
  });

  it('shouldnt be able to decrypt buffer with another password', () => {
    const value = Buffer.from('hide me');
    const encrypted = crypto1.encryptBuffer(value);
    const options = {
      key: Buffer.from('a95d8cb128734ff8821ea634dc34334535afe438524a782152d11a5248e71b01', 'hex'),
      hmacKey: Buffer.from('acf8cd2a90b1856c74a9f914abbb5f467c38252b611b138d8eedbe2abb4434fc', 'hex')
    };
    const anotherCrypto = new Crypto(options);

    should(() => {
      anotherCrypto.decryptBuffer(encrypted);
    }).throw(/tampered with/);
  });

  it('should encrypt and decrypt buffer', () => {
    const value = Buffer.from('hide me');
    const encrypted = crypto1.encryptBuffer(value);
    const decrypted = crypto2.decryptBuffer(encrypted);
    should(decrypted).eql(value);
  });

  it('should encrypt and decrypt binary buffer', () => {
    const value = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f], 'binary');
    const encrypted = crypto1.encryptBuffer(value);
    const decrypted = crypto2.decryptBuffer(encrypted);
    should(decrypted).eql(value);
  });

});
