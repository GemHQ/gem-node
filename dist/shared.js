"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require("debug");
exports.dbg = debug('gem:client');
exports.GEM_BASE_URL = 'https://api.sandbox.gem.co';
exports.GEM_CSRF_COOKIE_NAME = 'gem_user_csrf';
exports.GEM_CSRF_HEADER_NAME = 'X-Gem-User-Csrf-Token';
var Endpoints;
(function (Endpoints) {
    Endpoints["users"] = "/users";
    Endpoints["profiles"] = "/profiles";
    Endpoints["documents"] = "/documents";
    Endpoints["institutions"] = "/institutions";
    Endpoints["institution_users"] = "/institution_users";
    Endpoints["accounts"] = "/accounts";
    Endpoints["transactions"] = "/transactions";
    Endpoints["credentials"] = "/credentials";
    Endpoints["connections"] = "/connections";
    Endpoints["assets"] = "/gem_assets";
    Endpoints["prices"] = "/prices";
    Endpoints["auth"] = "/auth";
    Endpoints["otp"] = "/auth/otp";
    Endpoints["session_validity"] = "/authenticated";
    Endpoints["logout"] = "/logout";
    Endpoints["refresh"] = "/refresh";
    Endpoints["application_configurations"] = "/application_configs";
})(Endpoints = exports.Endpoints || (exports.Endpoints = {}));
var GemTypes;
(function (GemTypes) {
    var PartialTransactionDirectionType;
    (function (PartialTransactionDirectionType) {
        PartialTransactionDirectionType["BLOCKCHAIN"] = "blockchain";
        PartialTransactionDirectionType["BANK"] = "bank";
        PartialTransactionDirectionType["CARD"] = "card";
    })(PartialTransactionDirectionType = GemTypes.PartialTransactionDirectionType || (GemTypes.PartialTransactionDirectionType = {}));
    var DocumentType;
    (function (DocumentType) {
        DocumentType["DRIVERS_LICENSE"] = "drivers_license";
        DocumentType["PASSPORT"] = "passport";
        DocumentType["ACH_AUTHORIZATION_FORM"] = "ach_authorization_form";
        DocumentType["UTILITY_BILL"] = "utility_bill";
        DocumentType["BANK_STATEMENT"] = "bank_statement";
        DocumentType["SELFIE"] = "selfie";
    })(DocumentType = GemTypes.DocumentType || (GemTypes.DocumentType = {}));
    var FullTransactionDirectionType;
    (function (FullTransactionDirectionType) {
        FullTransactionDirectionType["BANK_TO_BLOCKCHAIN"] = "bank_blockchain";
        FullTransactionDirectionType["CARD_TO_BLOCKCHAIN"] = "card_blockchain";
        FullTransactionDirectionType["BLOCKCHAIN_TO_BANK"] = "blockchain_bank";
        FullTransactionDirectionType["BLOCKCHAIN_TO_CARD"] = "blockchain_card";
    })(FullTransactionDirectionType = GemTypes.FullTransactionDirectionType || (GemTypes.FullTransactionDirectionType = {}));
})(GemTypes = exports.GemTypes || (exports.GemTypes = {}));
