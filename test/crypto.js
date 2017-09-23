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

});
