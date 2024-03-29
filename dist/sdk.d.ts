import { FileModel, DocumentModel, ProfileModel, TransactionModel, PlaidAccountModel, AccountTypes, CredentialsModel, CredentialTypes } from './models';
import { Client } from './client';
import { GemResponseType } from './shared';
import { AxiosInstance } from 'axios';
import { INewCardParams, INewWyreCardAccount } from './models/account';
declare type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : DeepPartial<T[P]>;
};
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
        rawAxios: AxiosInstance;
        constructor(config: any);
        private getDocumentContentLength;
        asUser: {
            emailOTP: ({ userId, email, reCAPTCHAValue, }: {
                email?: string;
                userId?: string;
                reCAPTCHAValue: string;
            }) => Promise<GemResponseType.IBaseMessage>;
            confirmOTP: ({ otp, email, userId, }: {
                otp: string;
                email?: string;
                userId?: string;
            }) => Promise<GemResponseType.IUserInfo>;
            addPhoneNumber: ({ phoneNumber, }: {
                phoneNumber: string;
            }) => Promise<GemResponseType.IUserPhoneNumber>;
            listPhoneNumbers: () => Promise<GemResponseType.IUserPhoneNumber[]>;
            setPrimaryPhoneNumber: ({ id, }: {
                id: string;
            }) => Promise<GemResponseType.IBaseMessage>;
            sendPhoneVerificationCode: ({ id, }: {
                id: string;
            }) => Promise<GemResponseType.IBaseMessage>;
            verifyPhoneVerificationCode: (args: {
                id: string;
                otp: string;
            }) => Promise<GemResponseType.IUserPhoneNumber>;
            deletePhoneNumber: ({ id, }: {
                id: string;
            }) => Promise<GemResponseType.IBaseMessage>;
            refreshSession: () => Promise<GemResponseType.IUserInfo>;
            getMyInfo: () => Promise<GemResponseType.IUserInfo>;
            checkSessionValidity: () => Promise<{
                user: GemResponseType.IUserInfo;
                is_authenticated: boolean;
            }>;
        };
        listApplicationConfigurations: () => Promise<GemResponseType.IApplicationConfig[]>;
        createUser: ({ emailAddress, phoneNumber, }: {
            emailAddress: string;
            phoneNumber: string;
        }) => Promise<GemResponseType.IUser>;
        createUserConsent: (userId: string) => Promise<GemResponseType.IBaseMessage>;
        updateUser: (args: {
            userId: string;
            phoneNumber?: string;
            consented?: boolean;
        }) => Promise<GemResponseType.IUser>;
        listUsers: (args?: {
            pageNumber?: number;
            pageSize?: number;
        }) => Promise<GemResponseType.IUser[]>;
        getUser: (userId: string) => Promise<GemResponseType.IUser>;
        deleteUser: (userId: string) => Promise<GemResponseType.IBaseMessage>;
        sendUserSMSOTP: (userId: string) => Promise<GemResponseType.IBaseMessage>;
        verifyUserSMSOTP: (userId: string, otp: string) => Promise<GemResponseType.IBaseMessage>;
        listProfiles: (userId: string) => Promise<GemResponseType.IProfile[]>;
        getProfile: (profileId: string) => Promise<GemResponseType.IProfile>;
        deleteProfile: (profileId: string) => Promise<GemResponseType.IBaseMessage>;
        updateProfile: (profileId: string, profile: DeepPartial<ProfileModel>) => Promise<GemResponseType.IProfile>;
        createProfile: (userId: string, profile: ProfileModel) => Promise<GemResponseType.IProfile>;
        createTemporaryProfile: (userId: string, profile: ProfileModel) => Promise<GemResponseType.IProfile>;
        verifyProfileKYC: ({ profileId, documents, kycVerifier: kyc_verifier, onSuccess, }: {
            onSuccess?: {
                action: 'create_institution_user';
                params?: {
                    institution_id: 'wyre' | 'coinify';
                };
            };
            profileId: string;
            documents: {
                id: string;
                document_type: 'drivers_license' | 'passport' | 'selfie' | 'national_identity_card';
            }[];
            kycVerifier: 'onfido' | 'wyre';
        }) => Promise<GemResponseType.IBaseMessage>;
        listProfileVerifications: ({ profileId, }: {
            profileId: string;
        }) => Promise<GemResponseType.IProfileVerification[]>;
        listProfileDocuments: (profileId: string) => Promise<GemResponseType.IDocument[]>;
        createProfileDocument: (profileId: string, document: any) => Promise<GemResponseType.IDocument>;
        deleteDocument: (documentId: string) => Promise<GemResponseType.IBaseMessage>;
        updateDocument: (documentId: string, document: any) => Promise<GemResponseType.IDocument>;
        verifyInstitution2fa: ({ value, two_factor_id, }: {
            two_factor_id: string;
            value: string;
        }) => Promise<GemResponseType.IPending2fa>;
        listInstitution2fas: ({ resourceId, }: {
            resourceId: string;
        }) => Promise<GemResponseType.IPending2fa[]>;
        listInstitutions: () => Promise<GemResponseType.IInstitution[]>;
        getInstitution: (institutionId: string) => Promise<GemResponseType.IInstitution>;
        createInstitutionUser: (profileId: string, institutionId: string) => Promise<GemResponseType.IInstitutionUser>;
        updateInstitutionUser: (institutionUserId: string, profileId: string) => Promise<GemResponseType.IInstitutionUser>;
        getInstitutionUser: (institutionUserId: string) => Promise<GemResponseType.IInstitutionUser>;
        listInstitutionUsers: (user_id: string, profile_id: string) => Promise<GemResponseType.IInstitutionUser[]>;
        createAccount: (account: PlaidAccountModel | INewWyreCardAccount) => Promise<GemResponseType.IAccount>;
        updateAccount: (args: {
            cardParams: INewCardParams;
        } & {
            accountId: string;
        }) => Promise<GemResponseType.IAccount>;
        getAccount: (accountId: string) => Promise<GemResponseType.IAccount>;
        listAccounts: (userId: string) => Promise<GemResponseType.IAccount[]>;
        deleteAccount: (accountId: string) => Promise<GemResponseType.IAccount>;
        createTransaction: (transactionParams: TransactionModel) => Promise<GemResponseType.ITransaction>;
        confirmTransaction: (transactionId: string, cvc?: string) => Promise<GemResponseType.ITransaction>;
        listTransactions: (params?: {
            userId?: string;
            accountId?: string;
            beforeId?: string;
            afterId?: string;
            limit?: number;
        }) => Promise<GemResponseType.ITransaction[]>;
        getTransaction: (transactionId: string) => Promise<GemResponseType.ITransaction>;
        listTransactionPending2fas: ({ transactionId, }: {
            transactionId: string;
        }) => Promise<GemResponseType.ITransaction>;
        createCredentials: (credentialParams: CredentialsModel) => Promise<GemResponseType.ICreatedCredential>;
        createConnection: (args: {
            user_id: string;
            credential_id: string;
        } | {
            institution_id: string;
        }) => Promise<GemResponseType.IConnection>;
        updateConnection: (args: {
            connection_id: string;
            credential_id: string;
        } | {
            connection_id: string;
            institution_id: string;
        }) => Promise<GemResponseType.IConnection>;
        listConnections: (userId: string) => Promise<GemResponseType.IConnection[]>;
        getConnection: (connectionId: string) => Promise<GemResponseType.IConnection>;
        deleteConnection: (connectionId: string) => Promise<GemResponseType.IBaseMessage>;
        listAssets: (category?: 'cryptocurrency' | 'fiat') => Promise<GemResponseType.IAsset[]>;
        getAsset: (assetId: string, source?: string) => Promise<GemResponseType.IAsset>;
        listSupportedCurrencies: (institutionId: 'wyre' | 'coinify') => Promise<GemResponseType.ISupportedCurrencyResponse[]>;
        listAssetPrices: ({ asset_ids, currency_id, currency_ids, source, sources, }: {
            asset_ids?: string;
            currency_id?: string;
            currency_ids?: string;
            source?: string;
            sources?: string;
        }) => Promise<GemResponseType.IPrice[]>;
        getAssetPrice: ({ asset_id, currency_id, source, }: {
            asset_id: string;
            currency_id?: string;
            source?: string;
        }) => Promise<GemResponseType.IPrice>;
        findOrCreateUser: ({ email, userId, reCAPTCHAValue, }: {
            email?: string;
            userId?: string;
            reCAPTCHAValue?: string;
        }) => Promise<GemResponseType.IUser>;
        logOutUser: () => Promise<GemResponseType.IBaseMessage>;
        emailOTP: ({ userId, email, reCAPTCHAValue, }: {
            userId?: string;
            email?: string;
            reCAPTCHAValue: string;
        }) => Promise<GemResponseType.IBaseMessage>;
        verifyOTP: ({ email, userId, otpCode, }: {
            email?: string;
            userId?: string;
            otpCode: string;
        }) => Promise<GemResponseType.IVerifyOTP>;
        checkSessionValidity: () => Promise<GemResponseType.ISessionValidity>;
        refreshSession: () => Promise<{
            read_access_expires_at: number;
        }>;
        generateOnfidoSDKToken: ({ profileId, }: {
            profileId: string;
        }) => Promise<GemResponseType.IOnfidoSDKToken>;
        generatePlaidSDKToken: (params?: {
            accountId?: string;
            isWebView?: boolean;
        }) => Promise<{
            token: string;
            token_expiration: string;
        }>;
    }
}
export {};
