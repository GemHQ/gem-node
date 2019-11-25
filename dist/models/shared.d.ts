export interface BlockchainAddress {
    address: string;
    asset_id: string;
}
export declare type Destination = BlockchainAddress;
export declare enum CredentialTypes {
    OAUTH_2 = "oauth2",
    API_KEY = "api_key"
}
