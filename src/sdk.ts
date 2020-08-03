import {
  FileModel,
  DocumentModel,
  ProfileModel,
  TransactionModel,
  PlaidAccountModel,
  AccountTypes,
  CredentialsModel,
  CredentialTypes,
} from './models';
import { Client } from './client';
import { Endpoints, GemResponseType } from './shared';
import { AxiosInstance } from 'axios';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};

export namespace SDK {
  export namespace Models {
    export class Document extends DocumentModel {}
    export class File extends FileModel {}
    export class Profile extends ProfileModel {}
    export class Transaction extends TransactionModel {}
    export class PlaidAccount extends PlaidAccountModel {}
    export class Credentials extends CredentialsModel {}
  }

  export namespace Enums {
    export const NewAccountTypes = AccountTypes;
    export const NewCredentialTypes = CredentialTypes;
  }

  /**
   * The API class wraps the Client class in order to
   * streamline HTTP request construction by exposing
   * convenience methods for possible Gem API resources.
   */
  export class Gem {
    client: Client = null;
    rawAxios: AxiosInstance;

    constructor(config: any) {
      this.client = new Client(config);
      this.rawAxios = this.client.axios;
    }

    private getDocumentContentLength = async (document: {
      getLength: (cb: (err: any, length: number) => any) => any;
    }): Promise<number> => {
      return await new Promise((resolve, reject) => {
        return document.getLength((err, length) =>
          err ? reject(err) : resolve(length)
        );
      });
    };

    /**
     * APPLICATION
     */

    listApplicationConfigurations = async (): Promise<
      GemResponseType.IApplicationConfig[]
    > => await this.client.get(Endpoints.application_configurations);

    /**
     * USERS
     */
    createUser = async (
      emailAddress?: string
    ): Promise<GemResponseType.IUser> =>
      await this.client.post(Endpoints.users, {
        ...(emailAddress && { email: emailAddress }),
      });

    // TODO: move this to updateUser once supported by API.
    createUserConsent = async (
      userId: string
    ): Promise<GemResponseType.IBaseMessage> =>
      await this.client.put(`${Endpoints.users}/${userId}/consent`);

    updateUser = async (args: {
      userId: string;
      phoneNumber?: string;
      consented?: boolean;
    }): Promise<GemResponseType.IUser> => {
      const { userId, phoneNumber, consented } = args;
      return await this.client.put(`${Endpoints.users}/${userId}`, {
        consented,
        phone_number: phoneNumber,
      });
    };

    listUsers = async (): Promise<GemResponseType.IUser[]> =>
      await this.client.get(Endpoints.users);

    getUser = async (userId: string): Promise<GemResponseType.IUser> =>
      await this.client.get(`${Endpoints.users}/${userId}`);

    deleteUser = async (
      userId: string
    ): Promise<GemResponseType.IBaseMessage> =>
      await this.client.delete(`${Endpoints.users}/${userId}`);

    sendUserSMSOTP = async (
      userId: string
    ): Promise<GemResponseType.IBaseMessage> =>
      await this.client.post(`${Endpoints.users}/${userId}/send_sms`, {});

    verifyUserSMSOTP = async (
      userId: string,
      otp: string
    ): Promise<GemResponseType.IBaseMessage> =>
      await this.client.post(`${Endpoints.users}/${userId}/verify_sms`, {
        otp_code: otp,
      });

    /**
     * PROFILES
     */
    listProfiles = async (
      userId: string
    ): Promise<GemResponseType.IProfile[]> =>
      await this.client.get(Endpoints.profiles, { user_id: userId });

    getProfile = async (profileId: string): Promise<GemResponseType.IProfile> =>
      await this.client.get(`${Endpoints.profiles}/${profileId}`);

    deleteProfile = async (
      profileId: string
    ): Promise<GemResponseType.IBaseMessage> =>
      await this.client.delete(`${Endpoints.profiles}/${profileId}`);

    updateProfile = async (
      profileId: string,
      profile: DeepPartial<ProfileModel>
    ): Promise<GemResponseType.IProfile> =>
      await this.client.put(`${Endpoints.profiles}/${profileId}`, profile);

    createProfile = async (
      userId: string,
      profile: ProfileModel
    ): Promise<GemResponseType.IProfile> =>
      await this.client.post(Endpoints.profiles, profile, {
        qs: { user_id: userId },
      });

    createTemporaryProfile = async (
      userId: string,
      profile: ProfileModel
    ): Promise<GemResponseType.IProfile> => {
      const url = `${Endpoints.profiles}/temporary`;
      return await this.client.post(url, profile, {
        qs: { user_id: userId },
      });
    };

    verifyProfileKYC = async ({
      profileId,
      documents = [],
      kycVerifier: kyc_verifier,
    }: {
      profileId: string;
      documents: {
        id: string;
        document_type: 'drivers_license' | 'passport' | 'selfie';
      }[];
      kycVerifier: 'onfido';
    }): Promise<GemResponseType.IBaseMessage> => {
      return await this.client.post(
        `${Endpoints.profiles}/${profileId}/check`,
        {
          documents,
        },
        {
          qs: {
            kyc_verifier,
          },
        }
      );
    };

    listProfileVerifications = async ({
      profileId,
    }: {
      profileId: string;
    }): Promise<GemResponseType.IProfileVerification[]> => {
      return await this.client.get(
        `${Endpoints.profiles}/${profileId}/verifications`
      );
    };

    /**
     * DOCUMENTS
     */
    listProfileDocuments = async (
      profileId: string
    ): Promise<GemResponseType.IDocument[]> =>
      await this.client.get(`${Endpoints.profiles}/${profileId}/documents`);

    createProfileDocument = async (
      profileId: string,
      document: any
    ): Promise<GemResponseType.IDocument> => {
      const url = `${Endpoints.profiles}/${profileId}/documents`;
      return await this.client.post(url, document, {
        headers: {
          ...(this.client.IS_NODE && {
            ...document.getHeaders(),
            'Content-Length': await this.getDocumentContentLength(document),
          }),
          'Content-Type': 'multipart/form-data',
        },
      });
    };

    deleteDocument = async (
      documentId: string
    ): Promise<GemResponseType.IBaseMessage> =>
      await this.client.delete(`${Endpoints.documents}/${documentId}`);

    updateDocument = async (
      documentId: string,
      document: any
    ): Promise<GemResponseType.IDocument> => {
      return await this.client.put(
        `${Endpoints.documents}/${documentId}`,
        document,
        {
          headers: {
            ...(this.client.IS_NODE && {
              ...document.getHeaders(),
              'Content-Length': await this.getDocumentContentLength(document),
            }),
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    };
    /**
     * INSTITUTIONS
     */

    listInstitutions = async (): Promise<GemResponseType.IInstitution[]> =>
      await this.client.get(Endpoints.institutions);

    getInstitution = async (
      institutionId: string
    ): Promise<GemResponseType.IInstitution> =>
      await this.client.get(`${Endpoints.institutions}/${institutionId}`);

    /**
     * INSTITUTION USERS
     */
    createInstitutionUser = async (
      profileId: string,
      institutionId: string
    ): Promise<GemResponseType.IInstitutionUser> =>
      await this.client.post(Endpoints.institution_users, {
        profile_id: profileId,
        institution_id: institutionId,
      });

    updateInstitutionUser = async (
      institutionUserId: string,
      profileId: string
    ): Promise<GemResponseType.IInstitutionUser> =>
      await this.client.put(
        `${Endpoints.institution_users}/${institutionUserId}`,
        {
          profile_id: profileId,
        }
      );

    getInstitutionUser = async (
      institutionUserId: string
    ): Promise<GemResponseType.IInstitutionUser> =>
      await this.client.get(
        `${Endpoints.institution_users}/${institutionUserId}`
      );

    listInstitutionUsers = async (
      user_id: string,
      profile_id: string
    ): Promise<GemResponseType.IInstitutionUser[]> =>
      await this.client.get(`${Endpoints.institution_users}`, {
        user_id,
        profile_id,
      });

    /**
     * ACCOUNTS
     */

    createAccount = async (
      account: PlaidAccountModel
    ): Promise<GemResponseType.IAccount> =>
      await this.client.post(`${Endpoints.accounts}`, account);

    getAccount = async (accountId: string): Promise<GemResponseType.IAccount> =>
      await this.client.get(`${Endpoints.accounts}/${accountId}`);

    listAccounts = async (
      connectionId: string,
      userId?: string
    ): Promise<GemResponseType.IAccount[]> =>
      await this.client.get(`${Endpoints.accounts}`, {
        connection_id: connectionId,
        ...(userId && { user_id: userId }),
      });

    /**
     * TRANSACTIONS
     */

    createTransaction = async (
      transactionParams: TransactionModel
    ): Promise<GemResponseType.ITransaction> =>
      await this.client.post(`${Endpoints.transactions}`, transactionParams);

    confirmTransaction = async (
      transactionId: string
    ): Promise<GemResponseType.ITransaction> =>
      await this.client.post(`${Endpoints.transactions}/${transactionId}`);

    listTransactions = async (params?: {
      userId?: string;
      accountId?: string;
      beforeId?: string;
      afterId?: string;
      limit?: number;
    }): Promise<GemResponseType.ITransaction[]> => {
      const query: {
        user_id?: string;
        account_id?: string;
        before_id?: string;
        after_id?: string;
        limit?: number;
      } = {};
      if (params) {
        params.userId && (query.user_id = params.userId);
        params.accountId && (query.account_id = params.accountId);
        params.beforeId && (query.before_id = params.beforeId);
        params.afterId && (query.after_id = params.afterId);
        params.limit && (query.limit = params.limit);
      }
      return await this.client.get(`${Endpoints.transactions}`, query);
    };

    getTransaction = async (
      transactionId: string
    ): Promise<GemResponseType.ITransaction> =>
      await this.client.get(`${Endpoints.transactions}/${transactionId}`);

    /**
     * CREDENTIALS
     */

    createCredentials = async (
      credentialParams: CredentialsModel
    ): Promise<GemResponseType.ICreatedCredential> => {
      return await this.client.post(
        `${Endpoints.credentials}`,
        credentialParams
      );
    };

    /**
     * CONNECTIONS
     */

    createConnection = async (
      user_id: string,
      credential_id: string
    ): Promise<GemResponseType.IConnection> =>
      await this.client.post(Endpoints.connections, {
        credential_id,
        user_id,
      });

    updateConnection = async (
      connectionId: string,
      credentialId: string
    ): Promise<GemResponseType.IConnection> =>
      await this.client.put(`${Endpoints.connections}/${connectionId}`, {
        credential_id: credentialId,
      });

    listConnections = async (
      userId: string
    ): Promise<GemResponseType.IConnection[]> =>
      await this.client.get(Endpoints.connections, {
        qs: { user_id: userId },
      });

    getConnection = async (
      connectionId: string
    ): Promise<GemResponseType.IConnection> =>
      await this.client.get(`${Endpoints.connections}/${connectionId}`);

    deleteConnection = async (
      connectionId: string
    ): Promise<GemResponseType.IBaseMessage> =>
      await this.client.delete(`${Endpoints.connections}/${connectionId}`);

    /**
     * ASSETS
     */

    listAssets = async (
      category: 'cryptocurrency' | 'fiat' = 'cryptocurrency'
    ): Promise<GemResponseType.IAsset[]> =>
      await this.client.get(`${Endpoints.assets}`, { category });

    getAsset = async (
      assetId: string,
      source?: string
    ): Promise<GemResponseType.IAsset> =>
      await this.client.get(
        `${Endpoints.assets}/${assetId}${source ? '/' + source : ''}`
      );

    listSupportedCurrencies = async (
      institutionId: 'wyre' | 'coinify'
    ): Promise<GemResponseType.ISupportedCurrencyResponse[]> =>
      await this.client.get(
        `${Endpoints.institutions}/${institutionId}/supported_currencies`
      );

    /**
     * PRICES
     */

    listAssetPrices = async ({
      asset_ids,
      currency_id,
      source,
    }: {
      asset_ids?: string;
      currency_id?: string;
      source?: string;
    }): Promise<GemResponseType.IPrice[]> =>
      await this.client.get(Endpoints.prices, {
        currency_id,
        asset_ids,
        source,
      });

    getAssetPrice = async ({
      asset_id,
      currency_id,
      source,
    }: {
      asset_id: string;
      currency_id?: string;
      source?: string;
    }): Promise<GemResponseType.IPrice> =>
      await this.client.get(`${Endpoints.assets}/${asset_id}`, {
        currency_id,
        source,
      });

    /**
     * BROWSER AUTH
     */
    findOrCreateUser = async ({
      email,
      userId,
      reCAPTCHAValue,
    }: {
      email?: string;
      userId?: string;
      reCAPTCHAValue?: string;
    }): Promise<GemResponseType.IUser> =>
      await this.client.post(`${Endpoints.users}`, {
        email,
        user_id: userId,
        ...(!this.client.IS_NODE && { 'g-recaptcha-response': reCAPTCHAValue }),
      });

    logOutUser = async (): Promise<GemResponseType.IBaseMessage> =>
      await this.client.delete(`${Endpoints.logout}`, {});

    emailOTP = async ({
      userId,
      email,
      reCAPTCHAValue,
    }: {
      userId?: string;
      email?: string;
      reCAPTCHAValue: string;
    }): Promise<GemResponseType.IBaseMessage> =>
      await this.client.post(`${Endpoints.otp}/email_otp`, {
        email,
        ...(userId && { user_id: userId }),
        ...(!this.client.IS_NODE && { 'g-recaptcha-response': reCAPTCHAValue }),
      });

    verifyOTP = async ({
      email,
      userId,
      otpCode,
    }: {
      email?: string;
      userId?: string;
      otpCode: string;
    }): Promise<GemResponseType.IVerifyOTP> =>
      await this.client.post(`${Endpoints.otp}/verify_otp`, {
        email,
        otp_code: otpCode,
        ...(userId && { user_id: userId }),
      });

    checkSessionValidity = async (): Promise<
      GemResponseType.ISessionValidity
    > => await this.client.post(Endpoints.session_validity);

    refreshSession = async (): Promise<GemResponseType.IBaseMessage> => {
      return await this.client.post(Endpoints.refresh, {});
    };

    /**
     *
     * Browser Util
     *
     */

    generateOnfidoSDKToken = async ({
      profileId,
    }: {
      profileId: string;
    }): Promise<GemResponseType.IOnfidoSDKToken> => {
      if (this.client.IS_NODE)
        return Promise.reject('This request can only be made from a browser.');
      return await this.client.post(
        `${Endpoints.profiles}/${profileId}/sdk_session`,
        {},
        { qs: { kyc_verifier: 'onfido' } }
      );
    };
  }
}
