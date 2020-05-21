# Gem API Node.js Client

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
const BLOCKCHAIN_ADDRESS = 'mybitcoinaddress';

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
        source_amount: 100.0,
        blockchain_address: {
          address: BLOCKCHAIN_ADDRESS,
          asset_id: 'bitcoin',
        },
        type: 'buy',
        preview: false,
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
| baseUrl   | The Gem API base URL you want to use. <br>`https://api.gem.co` for production<br>`https://api.sandbox.gem.co` for sandbox. |
| options   | Configuration options that are passed to the [Axios Client](https://github.com/axios/axios#request-config) for _each_ request made to the API.           |

### SDK Requests

#### Users

| method     | parameters                    | description          | 
| ---------- | ----------------------------- | -------------------- | 
| createUser | (emailAddress?: string)       | Create a user.       | 
| getUser    | (userId: string)              | Get a user by ID.    |
| listUsers  | none                          | List all users       |
| deleteUser | (userId: string)              | Delete a user by ID. |

#### Profiles

| method                 | parameters                               | description                                                             |
| ---------------------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| createProfile          | (userId: string, profile: ProfileModel)  | Create a profile.                                                       |
| createTemporaryProfile | (userId: string, profile: ProfileModel)  | Create a temporary profile. This profile will exist for up to one hour. |
| getProfile             | (profileId: string)                      | Get a profile by ID.                                                    |
| listProfiles           | (userId: string)                         | Get a list of profiles.                                                 |
| updateProfile          | (userId: string, profile: ProfileModel)  | Create a profile.                                                       |
| deleteProfile          | (profileId: string)                      | Delete a profile by ID.                                                 |

#### Documents

| method                | parameters                                | description                                                                 |
| --------------------- | ----------------------------------------- | --------------------------------------------------------------------------- |
| createProfileDocument | (profileId: string, document: string)     | Attach a document to a profile. (Documents may have many files associated.) |
| listProfileDocuments  | (profileId: string)                       | List all profile documents.                                                 |
| updateDocument        | (profileId: string, document: string)     | Update a document.                                                          |
| deleteDocument        | (documentId: string)                      | Delete a document by ID.                                                    |

#### Institutions

| method           | parameters                | description                      |
| ---------------- | ------------------------- | -------------------------------- |
| getInstitution   | (institutionId: string)   | Get an institution by ID.        |
| listInstitutions | none                      | List all supported institutions. |

#### Institution Users

| method                | parameters                                     | description                    |
| --------------------- | ---------------------------------------------- | ------------------------------ |
| createInstitutionUser | (profileId: string, institutionId: string)     | Create an institution user.    |
| getInstitutionUser    | (institutionUserId: string)                    | Get an institution user by ID. |
| listInstitutionUser   | (user_id: string, profile_id: string)          | Get an institution user by ID. |
| updateInstitutionUser | (institutionUserId: string, profileId: string) | Update an institution user.    |

#### Accounts

| method        | description             |
| ------------- | ----------------------- |
| createAccount | Create an account.      |
| getAccount    | Get an account by ID    |
| listAccounts  | Get a list of accounts. |

#### Transactions

| method             | description                    |
| ------------------ | ------------------------------ |
| createTransaction  | Create a transaction.          |
| confirmTransaction | Confirm a transaction preview. |
| getTransaction     | Get a transaction by ID.       |
| listTransactions   | Get a list of transactions.    |

#### Credentials

| method            | description                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| createCredentials | Create a credentials object which can be used to link a user to a connection. No authentication is required. |

#### Connections

| method           | description                                                         |
| ---------------- | ------------------------------------------------------------------- |
| createConnection | Create a connection which will link a credential object and a user. |
| updateConnection | Update a connection's credential_id.                                |
| getConnection    | Get a connection by ID.                                             |
| listConnections  | Get a list of user connections.                                     |
| deleteConnection | Delete a connection by ID.                                          |

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
