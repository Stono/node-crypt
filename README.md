# node-crypt
A simple wrapper to encrypt and decrypt data with nodejs using aes-256-ctr, with a custom initialization vecotr and hmac sha256 hmac protection.

## Getting Started
Install the module with: `npm install --save node-crypt`

## Examples
Using the module is pretty simple.  Create an instance of the crypto class with 32bit hex keys for both `key` and `hmacKey`.

```
const Crypto = require('node-crypt');
const crypto = new Crypto({
  key: 'b95d8cb128734ff8821ea634dc34334535afe438524a782152d11a5248e71b01',
  hmacKey: 'dcf8cd2a90b1856c74a9f914abbb5f467c38252b611b138d8eedbe2abb4434fc'
});

// Have some data you want to protect
const unencryptedValue = 'your secret value';

// Encrypt it
const encryptedValue = crypto.encrypt(unencryptedValue);

// Decrypt it
const decryptedValue = crypto.decrypt(encryptedValue);
should('your secret value').eql(unencryptedValue);
```

*TIP*: You can create some keys using the nodejs crypto library: `require('crypto').randomBytes(32).toString('hex');`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 - 0.1.0 Initial Release
 - 0.1.1 Documentation update
 - 0.1.2 Tidyup
 - 1.0.0 Major changes, totally not backwards compatible in any way.  HMAC and IV.

## License
Copyright (c) 2017 Karl Stoney
Licensed under the Apache-2.0 license.
