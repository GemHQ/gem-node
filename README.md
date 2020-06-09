# Gem API Node.js Client

The official Node.js client for the [Gem API](http://petstore.swagger.io/?url=https://api.gem.co/apidocs#/).

## Install

```
npm install @gem.co/api
```

## Quickstart

```js
const { GEM_API_KEY, GEM_API_SECRET } = process.env;
const { Gem, Models, Enums } = require('@gem.co/api').SDK;
const { PlaidAccount } = Models;
const { NewAccountTypes } = Enums;
const BLOCKCHAIN_ADDRESS = 'mybitcoinaddress';

const FormData = require('form-data');
const fs = require('fs');
const fileData = fs.createReadStream('/my/passport/file.png');

// Create client
const gem = new Gem({
  apiKey: GEM_API_KEY,
  secretKey: GEM_API_SECRET,
  baseUrl: 'https://api.sandbox.gem.co',
});

const userProfile = {
  name: { given_names: 'My First Name', family_names: 'My Last Name' },
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
};

// Gem's API requires multipart/form-data for document uploads.
const profileDocument = new FormData();
profileDocument.append('type', 'passport');
profileDocument.append('description', 'Top level passport document.');
profileDocument.append('files[0][media_type]', 'image/png');
profileDocument.append('files[0][description]', 'First file for document.');
profileDocument.append('files[0][data]', fileData);

(async () => {
  try {
    const user = await gem.findOrCreateUser({ email: 'someuser@gmail.com' });
    await client.updateUser({
      userId: user.id,
      phoneNumber: '+12345678910',
    });
    await client.sendUserSMSOTP(user.id);
    // Get user input for OTP
    await client.verifyUserSMSOTP(user.id, userOTP);
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
    const txn = await gem.createTransaction({
      source_id: account.id,
      source_amount: 100.0,
      blockchain_address: {
        address: BLOCKCHAIN_ADDRESS,
        asset_id: 'bitcoin',
      },
      type: 'buy',
      preview: false,
    });

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
  /* Configuration Parameters */
});
```

Configuration Parameters:

| parameter | description                                                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| apiKey    | Gem API key for the respective environment.                                                                                                    |
| secretKey | Gem API secret for the respective environment.                                                                                                 |
| baseUrl   | The Gem API base URL you want to use. <br>`https://api.gem.co` for production<br>`https://api.sandbox.gem.co` for sandbox.                     |
| options   | Configuration options that are passed to the [Axios Client](https://github.com/axios/axios#request-config) for _each_ request made to the API. |

### SDK Requests

#### Users

| method     | parameters              | description          |
| ---------- | ----------------------- | -------------------- |
| createUser | (emailAddress?: string) | Create a user.       |
| getUser    | (userId: string)        | Get a user by ID.    |
| listUsers  | none                    | List all users       |
| deleteUser | (userId: string)        | Delete a user by ID. |

#### Profiles

| method                 | parameters                                | description                                                             |
| ---------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| createProfile          | ( userId: string, profile: ProfileModel ) | Create a profile.                                                       |
| createTemporaryProfile | ( userId: string, profile: ProfileModel ) | Create a temporary profile. This profile will exist for up to one hour. |
| getProfile             | ( profileId: string )                     | Get a profile by ID.                                                    |
| listProfiles           | ( userId: string )                        | Get a list of profiles.                                                 |
| updateProfile          | ( userId: string, profile: ProfileModel ) | Create a profile.                                                       |
| deleteProfile          | ( profileId: string )                     | Delete a profile by ID.                                                 |

#### Documents

| method                | parameters                              | description                                                                 |
| --------------------- | --------------------------------------- | --------------------------------------------------------------------------- |
| createProfileDocument | ( profileId: string, document: string ) | Attach a document to a profile. (Documents may have many files associated.) |
| listProfileDocuments  | ( profileId: string )                   | List all profile documents.                                                 |
| updateDocument        | ( profileId: string, document: string ) | Update a document.                                                          |
| deleteDocument        | ( documentId: string )                  | Delete a document by ID.                                                    |

#### Institutions

| method           | parameters                | description                      |
| ---------------- | ------------------------- | -------------------------------- |
| getInstitution   | ( institutionId: string ) | Get an institution by ID.        |
| listInstitutions | none                      | List all supported institutions. |

#### Institution Users

| method                | parameters                                       | description                    |
| --------------------- | ------------------------------------------------ | ------------------------------ |
| createInstitutionUser | ( profileId: string, institutionId: string )     | Create an institution user.    |
| getInstitutionUser    | ( institutionUserId: string )                    | Get an institution user by ID. |
| listInstitutionUser   | ( userId: string, profile_id: string )           | Get an institution user by ID. |
| updateInstitutionUser | ( institutionUserId: string, profileId: string ) | Update an institution user.    |

#### Accounts

| method        | parameters                                | description             |
| ------------- | ----------------------------------------- | ----------------------- |
| createAccount | ( account: PlaidAccountModel )            | Create an account.      |
| getAccount    | ( accountId: string )                     | Get an account by ID    |
| listAccounts  | ( connectionId: string, userId?: string ) | Get a list of accounts. |

#### Transactions

| method             | parameters                                                                                              | description                    |
| ------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------ |
| createTransaction  | ( transactionParams: TransactionModel )                                                                 | Create a transaction.          |
| confirmTransaction | ( transactionId: string )                                                                               | Confirm a transaction preview. |
| getTransaction     | ( transactionId: string )                                                                               | Get a transaction by ID.       |
| listTransactions   | ({ userId?: string, accountId?: string, beforeId?: string, afterId?: string, limit?: number }?: object) | Get a list of transactions.    |

#### Credentials

| method            | parameters                             | description                                                                                                  |
| ----------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| createCredentials | ( credentialParams: CredentialsModel ) | Create a credentials object which can be used to link a user to a connection. No authentication is required. |

#### Connections

| method           | parameters                                     | description                                                         |
| ---------------- | ---------------------------------------------- | ------------------------------------------------------------------- |
| createConnection | ( userId: string, credentialId: string )       | Create a connection which will link a credential object and a user. |
| getConnection    | ( connectionId: string )                       | Get a connection by ID.                                             |
| listConnections  | ( userId: string )                             | Get a list of user connections.                                     |
| updateConnection | ( connectionId: string, credentialId: string ) | Update a connection's credential_id.                                |
| deleteConnection | ( connectionId: string )                       | Delete a connection by ID.                                          |

#### Assets

| method     | parameters                               | description                                                       |
| ---------- | ---------------------------------------- | ----------------------------------------------------------------- |
| getAssets  | ( assetId: string, source?: string )     | Get assets from a source. assetIds can be a comma seperated list. |
| listAssets | ( category: 'cryptocurrency' or 'fiat' ) | List all supported assets of a certain category.                  |

#### Prices

| method          | parameters                                                | description                                          |
| --------------- | --------------------------------------------------------- | ---------------------------------------------------- |
| getAssetPrice   | ( assetId: string, currencyId: string, source?: string )  | Get an asset price in units of a requested currency. |
| listAssetPrices | ( assetIds: string, currencyId: string, source?: string ) | List asset prices in units of a requested currency.  |

### Vanilla Requests

Each function makes a request to Gem's API and returns a promise in response.

```js
const gem = new Gem({
  /* Configuration Parameters */
});

const client = gem.client;

client.get(path, parameters, options);
client.post(path, body, options);
client.put(path, body, options);
client.patch(path, body, options);
client.delete(path, body, options);
```

### Debugging

Setting the **DEBUG** environment variable will turn on Gem client debug logging.

```bash
  DEBUG=gem:* node bin/my_program
```
