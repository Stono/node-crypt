# node-crypt
A simple wrapper to handle encryption of strings.  To the best of my knowledge, this implements best practices for encryption including:

  - `aes-256-ctr` encryption algorithm
  - custom Initialization Vector for each encrypted value
  - HMAC/constant time compare to prevent tampering

## Getting Started
Install the module with: `npm install --save node-crypt`

## Examples
Using the module is pretty simple.  Create an instance of the crypto class with 32bit hex keys for both `key` and `hmacKey`.

*TIP*: You can create some keys using the nodejs crypto library: `require('crypto').randomBytes(32).toString('hex');`

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
should(decryptedValue).eql(unencryptedValue);
```

### Proof in the Pudding
As you can see here; encrypting the same string each time produces an entirely different value:

```
$ node
> const Crypto = require('./');
undefined
> const crypto = new Crypto({
...   key: 'b95d8cb128734ff8821ea634dc34334535afe438524a782152d11a5248e71b01',
...   hmacKey: 'dcf8cd2a90b1856c74a9f914abbb5f467c38252b611b138d8eedbe2abb4434fc'
... });
undefined
> crypto.encrypt('karl likes security');
'ad81f64f05f3bdcd99a4a173cf135c9a519948|c709a94576a80bdf2f7ac26d21e67d82|00b9012f9dd666c67d55d7010ecfcede8a188e8c0766f0ebdeb2812fc4ac65c6'
> crypto.encrypt('karl likes security');
'9a372f88874ec7632c3a373e3b7e81304a7563|70ee6f46c092909f7c2e366aaad6ed8f|4d40ab24e205a4b334062a95c4a6223a10adbc770c46aa3bb85d05b77fc904f4'
> crypto.encrypt('karl likes security');
'39a1f1472041d2ec13bb7e61bea03c89d43b80|8f8461c17264235dc73bf98ab40cfcc5|2080cd2bcaad6a08f4e0e5b7bb2473c49d626a4197d572fcfbda360ccd5509bd'
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 - 0.1.0 Initial Release
 - 0.1.1 Documentation update
 - 0.1.2 Tidyup
 - 1.0.0 Major changes, totally not backwards compatible in any way.  HMAC and IV.
 - 1.0.1 README updated

## License
Copyright (c) 2017 Karl Stoney
Licensed under the Apache-2.0 license.
