# node-crypt
A simple wrapper to encrypt and decrypt data with nodejs

## Getting Started
Install the module with: `npm install --save node-crypt`

## Examples
Using the module is pretty simple.  Create a new instance with an options object, "key" is the only mandatory property, algorithm will default to "aes-256-ctr".

```
const Crypto = require('node-crypt');
const crypto = new Crypto({
  key: 'some secret key for your encryption',
  algorithm: 'aes-256-ctr'
});

// Have some data you want to protect
const unencryptedValue = 'your secret value';

// Encrypt it
const encryptedValue = crypto.encrypt(unencryptedValue);
// encryptedValue === '11907da6763905a11eb9e102efcef215a4'

// Decrypt it
const decryptedValue = crypto.decrypt(encryptedValue);
// decryptedValue === 'your secret value' === unencryptedValue;
```
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 - 0.1.0 Initial Release
 - 0.1.1 Documentation update
 - 0.1.2 Tidyup

## License
Copyright (c) 2017 Karl Stoney
Licensed under the Apache-2.0 license.
