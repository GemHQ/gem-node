import {
  FileModel,
  DocumentModel,
  ProfileModel,
  TransactionModel,
  PlaidAccountModel,
  AccountTypes,
} from './models';
import { Client } from './client';
import { Endpoints } from './shared';

export namespace SDK {
  export namespace Models {
    export class Document extends DocumentModel {}
    export class File extends FileModel {}
    export class Profile extends ProfileModel {}
    export class Transaction extends TransactionModel {}
    export class PlaidAccount extends PlaidAccountModel {}
  }

  export namespace Enums {
    export const NewAccountTypes = AccountTypes;
  }

  /**
   * The API class wraps the Client class in order to
   * streamline HTTP request construction by exposing
   * convenience methods for possible Gem API resources.
   */
  export class Gem {
    private client: Client = null;

    constructor(config: any) {
      this.client = new Client(config);
    }

    /**
     * USERS
     */
    createUser = async (emailAddress?: string): Promise<any> =>
      await this.client.post(Endpoints.users, {
        ...(emailAddress && { email: emailAddress }),
      });

    listUsers = async (): Promise<any> =>
      await this.client.get(Endpoints.users);

    getUser = async (userId: string): Promise<any> =>
      await this.client.get(`${Endpoints.users}/${userId}`);

    deleteUser = async (userId: string): Promise<any> =>
      await this.client.delete(`${Endpoints.users}/${userId}`);

    /**
     * PROFILES
     */
    listProfiles = async (userId: string): Promise<any> =>
      await this.client.get(Endpoints.profiles, { user_id: userId });

    getProfile = async (profileId: string): Promise<any> =>
      await this.client.get(`${Endpoints.profiles}/${profileId}`);

    deleteProfile = async (profileId: string): Promise<any> =>
      await this.client.delete(`${Endpoints.profiles}/${profileId}`);

    updateProfile = async (
      profileId: string,
      profile: ProfileModel
    ): Promise<any> =>
      await this.client.put(
        `${Endpoints.profiles}/${profileId}`,
        {},
        {
          form: profile,
        }
      );

    createProfile = async (
      userId: string,
      profile: ProfileModel
    ): Promise<any> =>
      await this.client.post(Endpoints.profiles, profile, {
        qs: { user_id: userId },
      });

    createTemporaryProfile = async (
      userId: string,
      profile: ProfileModel
    ): Promise<any> => {
      const url = `${Endpoints.profiles}/temporary`;
      return await this.client.post(url, profile, {
        qs: { user_id: userId },
      });
    };

    /**
     * DOCUMENTS
     */
    listProfileDocuments = async (profileId: string) =>
      await this.client.get(`${Endpoints.profiles}/${profileId}/documents`);

    createProfileDocument = async (
      profileId: string,
      document: DocumentModel
    ): Promise<any> => {
      const url = `${Endpoints.profiles}/${profileId}/documents`;
      return await this.client.post(
        url,
        {},
        {
          formData: document.toFormData(),
        }
      );
    };

    deleteDocument = async (documentId: string): Promise<any> =>
      await this.client.delete(`${Endpoints.documents}/${documentId}`);

    updateDocument = async (
      documentId: string,
      document: DocumentModel
    ): Promise<any> =>
      await this.client.put(
        `${Endpoints.documents}/${documentId}`,
        {},
        {
          formData: document.toFormData(),
        }
      );

    /**
     * INSTITUTIONS
     */

    listInstitutions = async (): Promise<any> =>
      await this.client.get(Endpoints.institutions);

    getInstitution = async (institutionId: string): Promise<any> =>
      await this.client.get(`${Endpoints.institutions}/${institutionId}`);

    /**
     * INSTITUTION USERS
     */
    createInstitutionUser = async (
      profileId: string,
      institutionId: string
    ): Promise<any> =>
      await this.client.post(Endpoints.institution_users, {
        profile_id: profileId,
        institution_params: {
          id: institutionId,
        },
      });

    updateInstitutionUser = async (
      institutionUserId: string,
      profileId: string
    ): Promise<any> =>
      await this.client.put(
        `${Endpoints.institution_users}/${institutionUserId}`,
        {
          profile_id: profileId,
        }
      );

    getInstitutionUser = async (institutionUserId: string): Promise<any> =>
      await this.client.get(
        `${Endpoints.institution_users}/${institutionUserId}`
      );

    /**
     * ACCOUNTS
     */

    createAccount = async (account: PlaidAccountModel) =>
      await this.client.post(`${Endpoints.accounts}`, account);

    getAccount = async (accountId: string): Promise<any> =>
      await this.client.get(`${Endpoints.accounts}/${accountId}`);

    listAccounts = async (
      connectionId: string,
      userId?: string
    ): Promise<any> =>
      await this.client.get(`${Endpoints.accounts}`, {
        connection_id: connectionId,
        ...(userId && { user_id: userId }),
      });

    /**
     * TRANSACTIONS
     */

    createTransaction = async (transactionParams: TransactionModel) =>
      await this.client.post(`${Endpoints.transactions}`, transactionParams);

    listTransactions = async (page?: number) =>
      await this.client.get(`${Endpoints.transactions}`, {
        ...(page && { page }),
      });

    getTransaction = async (transactionId: string) =>
      await this.client.get(`${Endpoints.transactions}/${transactionId}`);
  }
}
