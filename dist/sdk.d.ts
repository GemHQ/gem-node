import { FileModel, DocumentModel, ProfileModel, TransactionModel, PlaidAccountModel, AccountTypes } from './models';
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
    }
    namespace Enums {
        const NewAccountTypes: typeof AccountTypes;
    }
    class Gem {
        private client;
        constructor(config: any);
        createUser: (emailAddress?: string) => Promise<any>;
        listUsers: () => Promise<any>;
        getUser: (userId: string) => Promise<any>;
        deleteUser: (userId: string) => Promise<any>;
        listProfiles: (userId: string) => Promise<any>;
        getProfile: (profileId: string) => Promise<any>;
        deleteProfile: (profileId: string) => Promise<any>;
        updateProfile: (profileId: string, profile: ProfileModel) => Promise<any>;
        createProfile: (userId: string, profile: ProfileModel) => Promise<any>;
        createTemporaryProfile: (userId: string, profile: ProfileModel) => Promise<any>;
        listProfileDocuments: (profileId: string) => Promise<any>;
        createProfileDocument: (profileId: string, document: DocumentModel) => Promise<any>;
        deleteDocument: (documentId: string) => Promise<any>;
        updateDocument: (documentId: string, document: DocumentModel) => Promise<any>;
        listInstitutions: () => Promise<any>;
        getInstitution: (institutionId: string) => Promise<any>;
        createInstitutionUser: (profileId: string, institutionId: string) => Promise<any>;
        updateInstitutionUser: (institutionUserId: string, profileId: string) => Promise<any>;
        getInstitutionUser: (institutionUserId: string) => Promise<any>;
        createAccount: (account: PlaidAccountModel) => Promise<any>;
        getAccount: (accountId: string) => Promise<any>;
        listAccounts: (connectionId: string, userId?: string) => Promise<any>;
        createTransaction: (transactionParams: TransactionModel) => Promise<any>;
        listTransactions: (page?: number) => Promise<any>;
        getTransaction: (transactionId: string) => Promise<any>;
    }
}
