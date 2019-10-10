export declare enum AccountTypes {
    PlaidAccount = "PlaidAccount",
    BankAccount = "BankAccount",
    CreditCard = "CreditCard",
    DebitCard = "DebitCard",
    ExchangeAccount = "ExchangeAccount",
    Wallet = "Wallet",
    BlockchainAddress = "BlockchainAddress"
}
export interface INewPlaidAccount {
    connection_id: string;
    type: AccountTypes;
    plaid_token: string;
    plaid_account_id?: string;
}
export declare class PlaidAccountModel implements INewPlaidAccount {
    connection_id: string;
    type: AccountTypes;
    plaid_token: string;
    plaid_account_id?: string;
    constructor({ connection_id, type, plaid_token, plaid_account_id, }: INewPlaidAccount);
}
