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

  export enum FullTransactionDirectionType {
    BANK_TO_BLOCKCHAIN = 'bank_blockchain',
    CARD_TO_BLOCKCHAIN = 'card_blockchain',
    BLOCKCHAIN_TO_BANK = 'blockchain_bank',
    BLOCKCHAIN_TO_CARD = 'blockchain_card',
  }
}

export namespace GemResponseType {
  export interface IProfileVerification {
    profile_id: string;
    status: 'pending' | 'approved' | 'user_action_pending' | 'failed';
    additional_reason: any;
    type: 'OnfidoVerification';
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
  }

  export interface ITransactionFee {
    type: string;
    amount: number;
    asset_id: string;
    summary: string;
    description: string;
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
    instructions: any;
    destination_asset_id: string;
    external_id: string;
    type: string;
    additional_data: any;
    is_preview?: boolean;
    reason: {
      message: string;
    };
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
}
