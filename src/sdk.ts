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
import { INewWyreCardAccount } from './models/account';

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
     * Used by the Gem widget only.
     * Public access should not rely on these methods.
     * There is ** no ** guarantee of compatibility maintenance.
     */
    asUser = {
      /**
       * Email user OTP.
       */
      emailOTP: ({
        userId,
        email,
      }: {
        email?: string;
        userId?: string;
      }): Promise<GemResponseType.IBaseMessage> => {
        return this.client.post(`${Endpoints.users}/otp`, {
          ...(userId && { user_id: userId }),
          ...(email && { email }),
        });
      },
      /**
       * Verify email OTP.
       */
      confirmOTP: ({
        otp,
        email,
        userId,
      }: {
        otp: string;
        email?: string;
        userId?: string;
      }): Promise<GemResponseType.IUserInfo> => {
        return this.client.post(`${Endpoints.users}/sign_in`, {
          otp,
          ...(userId && { user_id: userId }),
          ...(email && { email }),
        });
      },
      /**
       * Add a user phone number
       */
      addPhoneNumber: ({
        phoneNumber,
      }: {
        phoneNumber: string;
      }): Promise<GemResponseType.IUserPhoneNumber> => {
        return this.client.post(`${Endpoints.users}/phone_numbers`, {
          value: phoneNumber,
        });
      },
      /**
       * List a user's phone numbers
       */
      listPhoneNumbers: async (): Promise<
        GemResponseType.IUserPhoneNumber[]
      > => {
        return this.client.get(`${Endpoints.users}/phone_numbers`);
      },
      /**
       * Set a user's primary phone number
       */
      setPrimaryPhoneNumber: async ({
        id,
      }: {
        id: string;
      }): Promise<GemResponseType.IBaseMessage> => {
        return this.client.post(`${Endpoints.users}/phone_numbers/primary`, {
          id,
        });
      },
      /**
       * Given a user's phone number ID,
       * sends a new verification code to the number.
       */
      sendPhoneVerificationCode: async ({
        id,
      }: {
        id: string;
      }): Promise<GemResponseType.IBaseMessage> => {
        return this.client.post(
          `${Endpoints.users}/phone_numbers/${id}/resend_verification_code`,
          {}
        );
      },
      /**
       * Verify a user's SMS OTP.
       */
      verifyPhoneVerificationCode: async (args: {
        id: string;
        otp: string;
      }): Promise<GemResponseType.IUserPhoneNumber> => {
        return this.client.post(
          `${Endpoints.users}/phone_numbers/${args.id}/verify`,
          { otp: args.otp }
        );
      },
      /**
       * Delete a user's phone number by ID.
       */
      deletePhoneNumber: async ({
        id,
      }: {
        id: string;
      }): Promise<GemResponseType.IBaseMessage> => {
        return this.client.delete(`${Endpoints.users}/phone_numbers/${id}`);
      },
      /**
       * Refresh a logged in user's session
       */
      refreshSession: async (): Promise<GemResponseType.IUserInfo> => {
        return this.client.post(`${Endpoints.users}/session_refresh`, {});
      },
      /**
       * Get a logged in user's info.
       */
      getMyInfo: async (): Promise<GemResponseType.IUserInfo> => {
        return await this.client.get(`${Endpoints.users}/info`);
      },
      /**
       * Check the validity of a user's session.
       */
      checkSessionValidity: async (): Promise<{
        user: GemResponseType.IUserInfo;
        is_authenticated: boolean;
      }> => {
        return this.client.get(`${Endpoints.users}/is_authenticated`);
      },
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

    listUsers = async (
      args: {
        pageNumber?: number;
        pageSize?: number;
      } = {}
    ): Promise<GemResponseType.IUser[]> => {
      const { pageNumber: page, pageSize: size } = args;
      return await this.client.get(Endpoints.users, { page, size });
    };

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
      onSuccess,
    }: {
      onSuccess?: {
        action: 'create_institution_user';
        params?: { institution_id: 'wyre' | 'coinify' };
      };
      profileId: string;
      documents: {
        id: string;
        document_type:
          | 'drivers_license'
          | 'passport'
          | 'selfie'
          | 'national_identity_card';
      }[];
      kycVerifier: 'onfido' | 'wyre';
    }): Promise<GemResponseType.IBaseMessage> => {
      return await this.client.post(
        `${Endpoints.profiles}/${profileId}/check`,
        {
          documents,
          ...(onSuccess && { on_success: onSuccess }),
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

    verifyInstitution2fa = async ({
      value,
      two_factor_id,
    }: {
      two_factor_id: string;
      value: string;
    }): Promise<GemResponseType.IPending2fa> =>
      await this.client.post(
        `${Endpoints.intstitution_2fa}/${two_factor_id}/verify`,
        { value }
      );

    listInstitution2fas = async ({
      resourceId,
    }: {
      resourceId: string;
    }): Promise<GemResponseType.IPending2fa[]> =>
      await this.client.get(Endpoints.intstitution_2fa, {
        resource_id: resourceId,
      });

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
      account: PlaidAccountModel | INewWyreCardAccount
    ): Promise<GemResponseType.IAccount> => {
      return await this.client.post(`${Endpoints.accounts}`, account, {
        isPCI: account.type === AccountTypes.WyreCardAccount,
      });
    };

    getAccount = async (accountId: string): Promise<GemResponseType.IAccount> =>
      await this.client.get(`${Endpoints.accounts}/${accountId}`);

    listAccounts = async (
      userId: string
    ): Promise<GemResponseType.IAccount[]> =>
      await this.client.get(`${Endpoints.accounts}`, {
        user_id: userId,
      });

    deleteAccount = async (
      accountId: string
    ): Promise<GemResponseType.IAccount> => {
      return await this.client.delete(`${Endpoints.accounts}/${accountId}`);
    };

    /**
     * TRANSACTIONS
     */

    createTransaction = async (
      transactionParams: TransactionModel
    ): Promise<GemResponseType.ITransaction> =>
      await this.client.post(`${Endpoints.transactions}`, transactionParams);

    confirmTransaction = async (
      transactionId: string,
      cvc?: string
    ): Promise<GemResponseType.ITransaction> =>
      await this.client.post(`${Endpoints.transactions}/${transactionId}`, {
        ...(cvc && { cvc }),
      });

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

    // NOTE: this request is the same as getTransaction but makes requests to partners
    listTransactionPending2fas = async ({
      transactionId,
    }: {
      transactionId: string;
    }): Promise<GemResponseType.ITransaction> =>
      await this.client.get(
        `${Endpoints.transactions}/${transactionId}/2fa_requirements`
      );

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
      args:
        | {
            user_id: string;
            credential_id: string;
          }
        | { institution_id: string }
    ): Promise<GemResponseType.IConnection> =>
      await this.client.post(Endpoints.connections, args);

    updateConnection = async (
      args:
        | { connection_id: string; credential_id: string }
        | { connection_id: string; institution_id: string }
    ): Promise<GemResponseType.IConnection> =>
      await this.client.put(
        `${Endpoints.connections}/${args.connection_id}`,
        args
      );

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
      currency_ids,
      source,
      sources,
    }: {
      asset_ids?: string;
      // currency_id is left for backward compatibility
      currency_id?: string;
      currency_ids?: string;
      // source is left for backward compatibility
      source?: string;
      sources?: string;
    }): Promise<GemResponseType.IPrice[]> => {
      return await this.client.get(Endpoints.prices, {
        source,
        asset_ids,
        sources: source || sources,
        currency_ids: currency_id || currency_ids,
      });
    };

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
        sources: source,
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

    checkSessionValidity =
      async (): Promise<GemResponseType.ISessionValidity> =>
        await this.client.post(Endpoints.session_validity);

    refreshSession = async (): Promise<{ read_access_expires_at: number }> => {
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
