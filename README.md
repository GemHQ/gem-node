# Gem NodeJS API Client

Node.js client library for the [Gem API](https://developers.gem.co/).

## Install

```
npm install @gem/api
```

## Quickstart

```js
const { GEM_API_KEY, GEM_API_SECRET } = process.env;
const Gem = require('@gem/api').Client;

const gem = new Gem({
  apiKey: GEM_API_KEY,
  secretKey: GEM_API_SECRET,
});

gem.post('/users').then(
  ({ id }) => {
    console.log('New User ID: ', id);
  },
  err => {
    console.log('Oops, something went wrong:', err);
  }
);
```

## Client API Reference

### Constructor

```js
const gem = new GemClient({
  /* Parameters */
});
```

Configuration Parameters:

| parameter | description                                                                                                                |
| --------- | -------------------------------------------------------------------------------------------------------------------------- |
| apiKey    | Gem API key for the respective environment.                                                                                |
| secretKey | Gem API secret for the respective environment.                                                                             |
| baseUrl   | The Gem API base URL you want to use. <br>`https://vgs.gem.co` for production<br>`https://vgs-sandbox.gem.co` for sandbox. |  |
| options   | Options that are passed to the [Request](https://github.com/request/request) for _each_ request made to the API.           |

### Requests

Each function makes a request to Gem's API and returns a promise in response.

```js
gem.get(path, parameters, options);
gem.post(path, body, options);
gem.put(path, body, options);
gem.delete(path, body, options);
```

### Debugging

Setting the **DEBUG** environment variable will turn on Gem client debug logging.

```bash
  DEBUG=gem:* node bin/my_program
```
