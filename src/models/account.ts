export enum AccountTypes {
  PlaidAccount = 'PlaidAccount',
  BankAccount = 'BankAccount',
  CreditCard = 'CreditCard',
  DebitCard = 'DebitCard',
  ExchangeAccount = 'ExchangeAccount',
  Wallet = 'Wallet',
  BlockchainAddress = 'BlockchainAddress',
  WyreCardAccount = 'WyreDebitCardAccount',
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

export interface INewCardParams {
  first_name: string;
  last_name: string;
  address_street_1: string;
  address_street_2: string;
  address_country: string;
  address_state: string;
  address_city: string;
  address_postal_code: string;
  cc_number: string;
  cc_exp_month: string;
  cc_exp_year: string;
  cc_last_4: string;
  cc_issuer: string;
  phone_number: string;
  // TODO: make required once API supports
  cc_first_6?: string;
}

export interface INewWyreCardAccount {
  type: AccountTypes.WyreCardAccount;
  connection_id: string;
  card_params: INewCardParams;
}
