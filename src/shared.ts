import * as debug from 'debug';

/**
 * The GEM client debugger
 */
export const dbg = debug('gem:client');

/**
 * The Gem API base URL
 */
export const GEM_BASE_URL = 'https://api.sandbox.gem.co';

/**
 * Incoming CSRF cookie name
 */
export const GEM_CSRF_COOKIE_NAME = 'gem_user_csrf';

/**
 * Outgoing CSRF header name
 */
export const GEM_CSRF_HEADER_NAME = 'X-Gem-User-Csrf-Token';

/**
 * Gem API endpoints used by the client
 */
export enum Endpoints {
  application_users = '/application_users',
  users = '/users',
  profiles = '/profiles',
  documents = '/documents',
  institutions = '/institutions',
  institution_users = '/institution_users',
  accounts = '/accounts',
  transactions = '/transactions',
  credentials = '/credentials',
  connections = '/connections',
  assets = '/gem_assets',
  prices = '/prices',
  auth = '/auth',
  otp = '/auth/otp',
  session_validity = '/authenticated',
  logout = '/logout',
  refresh = '/refresh',
  application_configurations = '/application_configs',
  intstitution_2fa = '/institution_2fas',
  plaid = '/plaid',
}
export namespace GemTypes {
  export interface ResolvedCurrencyType {
    created_at: string;
    gem_asset_id: string;
    mapping_id: string;
    name: string;
    primary_color: string;
    resolved: boolean;
    source: string;
    ticker: string;
    transaction_fields: {};
    updated_at: string;
  }

  export enum PartialTransactionDirectionType {
    BLOCKCHAIN = 'blockchain',
    BANK = 'bank',
    CARD = 'card',
  }

  export enum DocumentType {
    DRIVERS_LICENSE = 'drivers_license',
    PASSPORT = 'passport',
    ACH_AUTHORIZATION_FORM = 'ach_authorization_form',
    PROOF_OF_ADDRESS = 'proof_of_address',
    SELFIE = 'selfie',
  }

  export enum SupportedTransactionType {
    SELL = 'sell',
    BUY = 'buy',
    TRANSFER = 'transfer',
  }

  export interface DocumentClassType {
    GovernmentId: {
      classifier: 'government_id';
      options: [DocumentType.DRIVERS_LICENSE, DocumentType.PASSPORT];
    };
    ProofOfAddress: {
      classifier: 'proof_of_address';
      options: [DocumentType.PROOF_OF_ADDRESS];
    };
    FacialSimilarity: {
      classifier: 'facial_similarity';
      options: [DocumentType.SELFIE];
    };
    Specialty: {
      classifier: 'specialty';
      options: [DocumentType.ACH_AUTHORIZATION_FORM];
    };
  }

  export enum FullTransactionDirectionType {
    BANK_TO_BLOCKCHAIN = 'bank_blockchain',
    CARD_TO_BLOCKCHAIN = 'card_blockchain',
    BLOCKCHAIN_TO_BANK = 'blockchain_bank',
    BLOCKCHAIN_TO_CARD = 'blockchain_card',
  }

  export type OnfidoConfigData = { enabled: boolean };
  export type WyreConfigData = { is_private: boolean };
  export type CoinifyConfigData = { is_private: boolean };
  export type FeatureAccessConfigData = { flag: 'stable' | 'beta' | 'alpha' };
  export type PlaidConfigData = { deep_link_uri: string };
}

export namespace GemResponseType {
  export type IApplicationConfig = {
    id: string;
    application_id: string;
    created_at: string;
    updated_at: string;
    type: 'wyre' | 'coinify' | 'onfido' | 'feature_access' | 'plaid';
    data:
      | GemTypes.OnfidoConfigData
      | GemTypes.WyreConfigData
      | GemTypes.CoinifyConfigData
      | GemTypes.FeatureAccessConfigData
      | GemTypes.PlaidConfigData;
  };

  export interface IProfileVerification {
    id: string;
    additional_note?: string;
    profile_id: string;
    status: 'pending' | 'approved' | 'pending_gem_review' | 'rejected';
    additional_reason: any;
    type: 'OnfidoVerification';
    created_at: string;
    updated_at: string;
  }

  export interface IOnfidoSDKToken {
    sdk_token: string;
  }

  export interface IAsset {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    ticker: string;
  }

  export interface IPrice {
    timestamp: string;
    asset_id: string;
    currency_id: string;
    price: number;
    institution_id: string;
  }

  export interface ICreatedCredential {
    credential_id: string;
    credential_expires_at: string;
  }
  export interface ISessionValidity {
    authenticated: boolean;
    application_id: string;
    user_id?: string;
    read_access_expires_at?: number;
    execute_access_expires_at?: number;
    user?: IUser;
  }

  export interface IConnection {
    id: string;
    created_at: string;
    updated_at: string;
    institution_id: string;
    user_id: string;
    institution_user_id: string;
    status: string;
    expires_at: string;
    additional_reason: any;
  }

  export interface IDocument {
    id: string;
    description: string;
    type: string;
    category: string;
  }

  export interface IUser {
    id: string;
    created_at: string;
    updated_at: string;
    verified: boolean;
    status:
      | 'verified'
      | 'pending_email_verification'
      | 'pending_phone_number_verification';
    consented: boolean;
    email: string;
    phone_number?: string;
  }

  export interface IProfile {
    id: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    status: string;
    expires_at?: string;
    country: string;
    state: string;
    documents: IDocument[];
  }

  export interface ICredentialFormat {
    format: string;
    fields: { [k: string]: any }[];
  }

  export interface IInstitution {
    id: string;
    name: string;
    credentials_formats: ICredentialFormat[];
  }

  export interface IBaseMessage {
    message: string;
  }

  export interface IVerifyOTP {
    user_id: string;
    application_id: string;
    read_access_expires_at: number;
    csrf: string;
    access?: string;
  }

  export interface IInstitutionUser {
    id: string;
    status: string;
    profile_id: string;
    institution_id: string;
    connection_id: string;
    external_id: string;
    additional_reason: any;
    profile: IProfile;
    institution: IInstitution;
    connection: IConnection;
    created_at: string;
    updated_at: string;
  }

  export interface IAccount {
    id: string;
    created_at: string;
    updated_at: string;
    asset_id: string;
    status: string;
    external_id: string;
    name: string;
    type: string;
    enabled: boolean;
    connection_id: string;
    institution_id: string;
    supported_transaction_types: GemTypes.SupportedTransactionType[];
    card_network?: string;
    total_amount?: number;
    available_amount?: number;
  }

  export interface ITransactionFee {
    type: 'partner_fee' | 'network_fee' | string;
    amount: number;
    asset_id: string;
  }

  export interface IPending2fa {
    id: string;
    status: 'pending' | 'completed' | string;
    retry_attempts: number;
    '2fa_type': 'card' | 'sms' | 'string';
    resource_id: string;
    institution_id: 'coinify' | 'wyre' | string;
    created_at: string;
    updated_at: string;
  }

  export interface ITransaction {
    id: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    source: {
      id: string;
      created_at: string;
      updated_at: string;
      asset_id: string;
      status: string;
      external_id: string;
      name: string;
      type: string;
      enabled: boolean;
      connection_id: string;
      institution_id: string;
    };
    fees: ITransactionFee[];
    status: string;
    source_amount: number;
    destination_amount: number;
    source_asset_id: string;
    instructions?:
      | {
          amount: number;
          asset_id: string;
          ticker: string;
          address_details: { address: string };
        }
      | object;
    destination_asset_id: string;
    external_id: string;
    type: string;
    additional_data: any;
    is_preview?: boolean;
    reason: {
      message: string;
    };
    breakdown: {
      fees: ITransactionFee[];
      source: {
        total: number;
        amount: number;
        asset_id: string;
        currency: string;
      };
      destination: {
        total: number;
        amount: number;
        asset_id: string;
        currency: string;
      };
    };
    pending_institution_2fas: IPending2fa[];
  }

  export interface ISupportedCurrencyResponse {
    institution_id: 'coinify' | 'wyre';
    resolved_destination_currency_count: number;
    resolved_source_currency_count: number;
    supported_destination_currency_count: number;
    supported_source_currency_count: number;
    transaction_direction: GemTypes.FullTransactionDirectionType;

    destination: {
      currencies: GemTypes.ResolvedCurrencyType[];
      fee_percentage: number;
      medium: GemTypes.PartialTransactionDirectionType;
    };

    source: {
      currencies: GemTypes.ResolvedCurrencyType[];
      fee_percentage: number;
      medium: GemTypes.PartialTransactionDirectionType;
      minimums: { [ticker: string]: number };
    };
  }

  export interface IUserPhoneNumber {
    confirmed_at: null | string;
    created_at: string;
    id: number;
    phone_number: string;
    primary: boolean;
    updated_at: string;
  }

  export interface IUserEmail {
    confirmed_at: null | string;
    created_at: string;
    email: string;
    id: number;
    primary: boolean;
    receive_notifications: boolean;
    updated_at: string;
  }

  export interface IIAMUser {
    backoffice_role: null | string;
    created_at: string;
    emails: IUserEmail[];
    gem_uid: string;
    phone_numbers: IUserPhoneNumber[];
    updated_at: string;
    username: null | string;
  }

  export interface IUserInfo extends IUser {
    iam_user: IIAMUser;
  }
}
