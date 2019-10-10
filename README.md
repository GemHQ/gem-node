# Gem NodeJS API Client

Node.js client library for the [Gem API](https://developers.gem.co/reference).

## Install

```
npm install @gem.co/api
```

## Quickstart

```js
const { GEM_API_KEY, GEM_API_SECRET } = process.env;
const { Gem, Models, Enums } = require('@gem.co/api').SDK;
const { Profile, Document, PlaidAccount, Transaction } = Models;
const { NewAccountTypes } = Enums;

const fs = require('fs');
const passportFile = fs.createReadStream('/my/passport/file.png');

const gem = new Gem({
  apiKey: GEM_API_KEY,
  secretKey: GEM_API_SECRET,
});

const userProfile = new Profile({
  name: { given_names: 'My First Name', family_names: 'My Last Name' },
  phone_number: '+11234567890',
  address: {
    street_1: '1123 Flower st.',
    street_2: 'APT 123',
    city: 'Los Angeles',
    postal_code: '90024',
    country: 'US',
    state: 'CA',
  },
  email_address: 'someone@example.com',
  social_security_number: '123-45-0976',
  date_of_birth: '11-20-1976',
});

const profileDocument = new Document({
  type: 'passport',
  description: 'My passport',
  files: [
    {
      data: passportFile,
      media_type: 'image/png',
      description: 'the file description',
      orientation: 'front',
    },
  ],
});

(async () => {
  try {
    const user = await gem.createUser();
    const profile = await gem.createProfile(user.id, userProfile);
    await gem.createProfileDocument(profile.id, profileDocument);
    const institutionUser = await gem.createInstitutionUser(profile.id, 'wyre');

    const plaidAccount = new PlaidAccount({
      connection_id: institutionUser.connection_id,
      type: NewAccountTypes.PlaidAccount,
      plaid_token: 'a-wyre-plaid-public-token',
    });

    const account = await gem.createAccount(plaidAccount);

    // Create a transaction, assuming the third party has approved this account.
    const txn = await gem.createTransaction(
      new Transaction({
        source_id: account.id,
        amount: {
          quantity: 101.1453221,
          asset_id: 'bitcoin',
        },
        destination: {
          blockchain_address: 'mybitcoinaddress',
        },
        type: 'buy',
        fees_inclusive: true,
      })
    );

    console.log(txn);
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
| baseUrl   | The Gem API base URL you want to use. <br>`https://vgs.gem.co` for production<br>`https://vgs-sandbox.gem.co` for sandbox. |
| options   | Options that are passed to the [Request](https://github.com/request/request) for _each_ request made to the API.           |

### SDK Requests

#### Users

| method     | description          |
| ---------- | -------------------- |
| createUser | Create a user.       |
| getUser    | Get a user by ID.    |
| listUsers  | Get a list of users. |
| deleteUser | Delete a user by ID. |

#### Profiles

| method                 | description                                                             |
| ---------------------- | ----------------------------------------------------------------------- |
| createProfile          | Create a profile.                                                       |
| createTemporaryProfile | Create a temporary profile. This profile will exist for up to one hour. |
| getProfile             | Get a profile by ID.                                                    |
| listProfiles           | Get a list of profiles.                                                 |
| deleteProfile          | Delete a profile by ID.                                                 |

#### Documents

| method                | description                                                                 |
| --------------------- | --------------------------------------------------------------------------- |
| createProfileDocument | Attach a document to a profile. (Documents may have many files associated.) |
| listProfileDocuments  | List all profile documents.                                                 |
| updateDocument        | Update an document.                                                         |
| deleteDocument        | Delete a document by ID.                                                    |

#### Institutions

| method           | description                      |
| ---------------- | -------------------------------- |
| listInstitutions | List all supported institutions. |
| getInsitution    | Get an institution by ID.        |

#### Institution Users

| method                | description                    |
| --------------------- | ------------------------------ |
| createInstitutionUser | Create an institution user.    |
| updateInstitutionUser | Update an institution user.    |
| getInsitutionUser     | Get an institution user by ID. |

#### Accounts

| method        | description             |
| ------------- | ----------------------- |
| createAccount | Create an account.      |
| getAccount    | Get an account by ID    |
| listAccounts  | Get a list of accounts. |

#### Transactions

| method            | description                 |
| ----------------- | --------------------------- |
| createTransaction | Create a transaction.       |
| getTransaction    | Get a transaction by ID     |
| listTransaction   | Get a list of transactions. |

### Vanilla Requests

Each function makes a request to Gem's API and returns a promise in response.

```js
gem.get(path, parameters, options);
gem.post(path, body, options);
gem.put(path, body, options);
gem.patch(path, body, options);
gem.delete(path, body, options);
```

### Debugging

Setting the **DEBUG** environment variable will turn on Gem client debug logging.

```bash
  DEBUG=gem:* node bin/my_program
```
