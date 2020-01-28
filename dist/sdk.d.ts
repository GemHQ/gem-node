import { FileModel, DocumentModel, ProfileModel, TransactionModel, PlaidAccountModel, AccountTypes, CredentialsModel, CredentialTypes } from './models';
import { Client } from './client';
import { GemResponseType } from './shared';
export declare namespace SDK {
    namespace Models {
        class Document extends DocumentModel {
        }
        class File extends FileModel {
        }
        class Profile extends ProfileModel {
        }
        class Transaction extends TransactionModel {
        }
        class PlaidAccount extends PlaidAccountModel {
        }
        class Credentials extends CredentialsModel {
        }
    }
    namespace Enums {
        const NewAccountTypes: typeof AccountTypes;
        const NewCredentialTypes: typeof CredentialTypes;
    }
    class Gem {
        client: Client;
        constructor(config: any);
        createUser: (emailAddress?: string) => Promise<GemResponseType.IUser>;
        createUserConsent: (userId: string) => Promise<GemResponseType.IBaseMessage>;
        listUsers: () => Promise<GemResponseType.IUser[]>;
        getUser: (userId: string) => Promise<GemResponseType.IUser>;
        deleteUser: (userId: string) => Promise<GemResponseType.IBaseMessage>;
        listProfiles: (userId: string) => Promise<GemResponseType.IProfile[]>;
        getProfile: (profileId: string) => Promise<GemResponseType.IProfile>;
        deleteProfile: (profileId: string) => Promise<GemResponseType.IBaseMessage>;
        updateProfile: (profileId: string, profile: ProfileModel) => Promise<GemResponseType.IProfile>;
        createProfile: (userId: string, profile: ProfileModel) => Promise<GemResponseType.IProfile>;
        createTemporaryProfile: (userId: string, profile: ProfileModel) => Promise<GemResponseType.IProfile>;
        listProfileDocuments: (profileId: string) => Promise<GemResponseType.IDocument[]>;
        createProfileDocument: (profileId: string, document: DocumentModel) => Promise<GemResponseType.IDocument>;
        deleteDocument: (documentId: string) => Promise<GemResponseType.IBaseMessage>;
        updateDocument: (documentId: string, document: DocumentModel) => Promise<GemResponseType.IDocument>;
        listInstitutions: () => Promise<GemResponseType.IInstitution[]>;
        getInstitution: (institutionId: string) => Promise<GemResponseType.IInstitution>;
        createInstitutionUser: (profileId: string, institutionId: string) => Promise<GemResponseType.IInstitutionUser>;
        updateInstitutionUser: (institutionUserId: string, profileId: string) => Promise<GemResponseType.IInstitutionUser>;
        getInstitutionUser: (institutionUserId: string) => Promise<GemResponseType.IInstitutionUser>;
        createAccount: (account: PlaidAccountModel) => Promise<GemResponseType.IAccount>;
        getAccount: (accountId: string) => Promise<GemResponseType.IAccount>;
        listAccounts: (connectionId: string, userId?: string) => Promise<GemResponseType.IAccount[]>;
        createTransaction: (transactionParams: TransactionModel) => Promise<GemResponseType.ITransaction>;
        confirmTransaction: (transactionId: string) => Promise<GemResponseType.ITransaction>;
        listTransactions: (page?: number) => Promise<GemResponseType.ITransaction[]>;
        getTransaction: (transactionId: string) => Promise<GemResponseType.ITransaction>;
        createCredentials: (credentialParams: CredentialsModel) => Promise<GemResponseType.ICreatedCredential>;
        createConnection: (user_id: string, credential_id: string) => Promise<GemResponseType.IConnection>;
        updateConnection: (connectionId: string, credentialId: string) => Promise<GemResponseType.IConnection>;
        listConnections: (userId: string) => Promise<GemResponseType.IConnection[]>;
        getConnection: (connectionId: string) => Promise<GemResponseType.IConnection>;
        deleteConnection: (connectionId: string) => Promise<GemResponseType.IBaseMessage>;
        findOrCreateUser: (email: string) => Promise<GemResponseType.IUser>;
        emailOTP: (userId: string) => Promise<GemResponseType.IBaseMessage>;
        verifyOTP: (userId: string, otpCode: string) => Promise<GemResponseType.IVerifyOTP>;
        checkSessionValidity: () => Promise<GemResponseType.ISessionValidity>;
    }
}
