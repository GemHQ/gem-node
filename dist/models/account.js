"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaidAccountModel = exports.AccountTypes = void 0;
var AccountTypes;
(function (AccountTypes) {
    AccountTypes["PlaidAccount"] = "PlaidAccount";
    AccountTypes["BankAccount"] = "BankAccount";
    AccountTypes["CreditCard"] = "CreditCard";
    AccountTypes["DebitCard"] = "DebitCard";
    AccountTypes["ExchangeAccount"] = "ExchangeAccount";
    AccountTypes["Wallet"] = "Wallet";
    AccountTypes["BlockchainAddress"] = "BlockchainAddress";
    AccountTypes["WyreCardAccount"] = "WyreDebitCardAccount";
})(AccountTypes = exports.AccountTypes || (exports.AccountTypes = {}));
var PlaidAccountModel = (function () {
    function PlaidAccountModel(_a) {
        var connection_id = _a.connection_id, type = _a.type, plaid_token = _a.plaid_token, plaid_account_id = _a.plaid_account_id;
        this.connection_id = connection_id;
        this.type = type;
        this.plaid_token = plaid_token;
        this.plaid_account_id = plaid_account_id;
    }
    return PlaidAccountModel;
}());
exports.PlaidAccountModel = PlaidAccountModel;
