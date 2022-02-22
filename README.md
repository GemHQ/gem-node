# Official Gem API Node.js Client

The official Node.js client for the [Gem API](http://petstore.swagger.io/?url=https://api.gem.co/apidocs#/).

## Install

```
npm install @gem.co/api
```

## Quickstart

### Server

```js
// Set the SDK constants.
const { GEM_API_KEY, GEM_API_SECRET } = process.env;
const { Gem } = require('@gem.co/api').SDK;

// Create client instance.
const gem = new Gem({
  apiKey: GEM_API_KEY,
  secretKey: GEM_API_SECRET,
  environment: 'sandbox',
});

/**
 *
 * MAIN
 *
 **/

(async () => {
  try {
    const applicationUsers = await gem.listUsers();
    const firstUser = applicationUsers[0];
    const transactions = await gem.listTransactions({ userId: firstUser.id });

    console.log('User Transactions', transactions);
  } catch (e) {
    console.error('Gem Error', e);
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

| parameter   | description                                                                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| apiKey      | Gem API key for the respective environment.                                                                                                    |
| secretKey   | Gem API secret for the respective environment.                                                                                                 |
| environment | The Gem API environment. Options: **sandbox** or **production**.                                                                               |
| options     | Configuration options that are passed to the [Axios Client](https://github.com/axios/axios#request-config) for _each_ request made to the API. |

### SDK Requests

#### Users

| method    | parameters                               | description       |
| --------- | ---------------------------------------- | ----------------- |
| getUser   | (userId: string)                         | Get a user by ID. |
| listUsers | (pageNumber?: number, pageSize?: number) | List all users    |

#### Profiles

| method        | parameters                                | description       |
| ------------- | ----------------------------------------- | ----------------- |
| createProfile | ( userId: string, profile: ProfileModel ) | Create a profile. |

<!--
| createTemporaryProfile | ( userId: string, profile: ProfileModel ) | Create a temporary profile. This profile will exist for up to one hour. |
| getProfile             | ( profileId: string )                     | Get a profile by ID.                                                    |
| listProfiles           | ( userId: string )                        | Get a list of profiles.                                                 |
| updateProfile          | ( userId: string, profile: ProfileModel ) | Create a profile.                                                       |
| deleteProfile          | ( profileId: string )                     | Delete a profile by ID.                                                 | -->

#### Documents

| method                | parameters                                | description                                                                 |
| --------------------- | ----------------------------------------- | --------------------------------------------------------------------------- |
| createProfileDocument | ( profileId: string, document: FormData ) | Attach a document to a profile. (Documents may have many files associated.) |

<!--
| listProfileDocuments  | ( profileId: string )                     | List all profile documents.                                                 |
| updateDocument        | ( profileId: string, document: FormData ) | Update a document.                                                          |
| deleteDocument        | ( documentId: string )                    | Delete a document by ID.                                                    | -->

#### Institutions

| method           | parameters                | description                      |
| ---------------- | ------------------------- | -------------------------------- |
| getInstitution   | ( institutionId: string ) | Get an institution by ID.        |
| listInstitutions | none                      | List all supported institutions. |

<!-- #### Institution Users

| method                | parameters                                       | description                    |
| --------------------- | ------------------------------------------------ | ------------------------------ |
| createInstitutionUser | ( profileId: string, institutionId: string )     | Create an institution user.    |
| getInstitutionUser    | ( institutionUserId: string )                    | Get an institution user by ID. |
| listInstitutionUser   | ( userId: string, profile_id: string )           | Get an institution user by ID. |
| updateInstitutionUser | ( institutionUserId: string, profileId: string ) | Update an institution user.    | -->

<!-- #### Accounts

| method        | parameters                                | description             |
| ------------- | ----------------------------------------- | ----------------------- |
| createAccount | ( account: PlaidAccountModel )            | Create an account.      |
| getAccount    | ( accountId: string )                     | Get an account by ID    |
| listAccounts  | ( connectionId: string, userId?: string ) | Get a list of accounts. | -->

#### Transactions

| method           | parameters                                                                                              | description                 |
| ---------------- | ------------------------------------------------------------------------------------------------------- | --------------------------- |
| getTransaction   | ( transactionId: string )                                                                               | Get a transaction by ID.    |
| listTransactions | ({ userId?: string, accountId?: string, beforeId?: string, afterId?: string, limit?: number }?: object) | Get a list of transactions. |

<!-- #### Credentials

| method            | parameters                             | description                                                                                                  |
| ----------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| createCredentials | ( credentialParams: CredentialsModel ) | Create a credentials object which can be used to link a user to a connection. No authentication is required. | -->

<!-- #### Connections

| method           | parameters                                     | description                                                         |
| ---------------- | ---------------------------------------------- | ------------------------------------------------------------------- |
| createConnection | ( userId: string, credentialId: string )       | Create a connection which will link a credential object and a user. |
| getConnection    | ( connectionId: string )                       | Get a connection by ID.                                             |
| listConnections  | ( userId: string )                             | Get a list of user connections.                                     |
| updateConnection | ( connectionId: string, credentialId: string ) | Update a connection's credential_id.                                |
| deleteConnection | ( connectionId: string )                       | Delete a connection by ID.                                          | -->

#### Assets

| method     | parameters                               | description                                                       |
| ---------- | ---------------------------------------- | ----------------------------------------------------------------- |
| getAssets  | ( assetId: string, source?: string )     | Get assets from a source. assetIds can be a comma seperated list. |
| listAssets | ( category: 'cryptocurrency' or 'fiat' ) | List all supported assets of a certain category.                  |

#### Payment Methods + Supported Currencies

| method                  | parameters                       | description                                                                       |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------------------- |
| listSupportedCurrencies | (institutionId: wyre or coinify) | List payment methods for a particular institution and their supported currencies. |

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
