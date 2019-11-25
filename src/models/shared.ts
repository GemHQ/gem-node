export interface BlockchainAddress {
  address: string;
  asset_id: string;
}

export type Destination = BlockchainAddress;

export enum CredentialTypes {
  OAUTH_2 = 'oauth2',
  API_KEY = 'api_key',
}
