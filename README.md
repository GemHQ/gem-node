# Gem NodeJS API Client

Node.js client library for the [Gem API](https://developers.gem.co/reference).

## Install

```
npm install @gem.co/api
```

## Quickstart

```js
const { GEM_API_KEY, GEM_API_SECRET } = process.env;
const Gem = require('@gem.co/api').Client;

const gem = new Gem({
  apiKey: GEM_API_KEY,
  secretKey: GEM_API_SECRET,
});

const Profile = {
  name: { given_names: 'My First Name', family_names: 'My Last Name' },
  phone_number: '+11234567890',
  address: {
    street_1: '1123 flower',
    street_2: '',
    city: 'los angeles',
    postal_code: '90024',
    country: 'us',
  },
  email_address: 'someone@example.com',
  social_security_number: '123-45-0976',
  date_of_birth: '11-20-1976',
  documents: [
    {
      description: 'some description',
      type: 'Passport',
      files: [
        {
          description: 'none',
          file_data: {
            data: 'data here',
            encoding: 'base64',
            media_type: 'image/png',
          },
          orientation: 'front',
        },
      ],
    },
  ],
};

(async () => {
  try {
    const { id } = await gem.post('/users');
    const profile = await gem.post('/profiles', Profile, {
      qs: { user_id: id },
    });
    console.log(profile);
  } catch (e) {
    console.error(e);
  }
})();
```

## Client API Reference

### Constructor

```js
const gem = new Gem({
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
