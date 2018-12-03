# Metadata

[![Build Status](https://travis-ci.org/rojo2/metadata.svg?branch=master)](https://travis-ci.org/rojo2/metadata)
[![Coverage Status](https://coveralls.io/repos/github/rojo2/metadata/badge.svg?branch=master)](https://coveralls.io/github/rojo2/metadata?branch=master)

Extracts OpenGraph data, linked data and metadata from web pages in a very easy way.

## Using it as a module

```javascript
import metadata from '@rojo2/metadata';

const pageMetadata = await metadata.get('https://<product url>')
console.log(pageMetadata)
```

## Using it as a CLI

```sh
$ npm i -g @rojo2/metadata
$ metadata <url>
```

## Using it as a serverless API

If you use [now](https://zeit.co/now) you can simply run `now` and you'll have a useful 
serverless service for extracting web page metadata.

```sh
$ now
```

## How to test it

```sh
$ npm install
$ npm test
```

## TODO 

- [ ] Add more tests/better code coverage
- [ ] Add better open graph parsing (right now it only extracts type, image, title, description and url)
- [ ] Add more user agents (or make an optional parameter to pass your own user agent)
- [ ] Add more serverless services?
- [ ] Add dockerized version?

## Contributors

- [AzazelN28](https://github.com/azazeln28)

## License

[The MIT License](http://opensource.org/licenses/MIT) 

## Donate

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VL264WAE64MLQ&source=url)

Made with :heart: by ROJO 2 <http://rojo2.com>
