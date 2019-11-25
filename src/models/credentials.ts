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

export class CredentialsModel implements INewCredentials {
  institution_id: string;
  credential_type: CredentialTypes;
  credential: IApiKeyCredential | object;

  constructor({
    institution_id,
    credential,
    credential_type,
  }: INewCredentials) {
    this.institution_id = institution_id;
    this.credential = credential;
    this.credential_type = credential_type;
  }
}
