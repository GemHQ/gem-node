export enum AccountTypes {
  PlaidAccount = 'PlaidAccount',
  BankAccount = 'BankAccount',
  CreditCard = 'CreditCard',
  DebitCard = 'DebitCard',
  ExchangeAccount = 'ExchangeAccount',
  Wallet = 'Wallet',
  BlockchainAddress = 'BlockchainAddress',
}

export interface INewPlaidAccount {
  connection_id: string;
  type: AccountTypes;
  plaid_token: string;
  plaid_account_id?: string;
}

export class PlaidAccountModel implements INewPlaidAccount {
  connection_id: string;
  type: AccountTypes;
  plaid_token: string;
  plaid_account_id?: string;

  constructor({
    connection_id,
    type,
    plaid_token,
    plaid_account_id,
  }: INewPlaidAccount) {
    this.connection_id = connection_id;
    this.type = type;
    this.plaid_token = plaid_token;
    this.plaid_account_id = plaid_account_id;
  }
}
