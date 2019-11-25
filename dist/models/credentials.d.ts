import { CredentialTypes } from './shared';
export interface INewCredentials {
    institution_id: string;
    credential_type: CredentialTypes;
    credential: IApiKeyCredential | object;
}
export interface IApiKeyCredential {
    api_key: string;
    secret: string;
}
export declare class CredentialsModel implements INewCredentials {
    institution_id: string;
    credential_type: CredentialTypes;
    credential: IApiKeyCredential | object;
    constructor({ institution_id, credential, credential_type, }: INewCredentials);
}
