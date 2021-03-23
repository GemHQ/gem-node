"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = void 0;
var models_1 = require("./models");
var client_1 = require("./client");
var shared_1 = require("./shared");
var SDK;
(function (SDK) {
    var Models;
    (function (Models) {
        var Document = (function (_super) {
            __extends(Document, _super);
            function Document() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Document;
        }(models_1.DocumentModel));
        Models.Document = Document;
        var File = (function (_super) {
            __extends(File, _super);
            function File() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return File;
        }(models_1.FileModel));
        Models.File = File;
        var Profile = (function (_super) {
            __extends(Profile, _super);
            function Profile() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Profile;
        }(models_1.ProfileModel));
        Models.Profile = Profile;
        var Transaction = (function (_super) {
            __extends(Transaction, _super);
            function Transaction() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Transaction;
        }(models_1.TransactionModel));
        Models.Transaction = Transaction;
        var PlaidAccount = (function (_super) {
            __extends(PlaidAccount, _super);
            function PlaidAccount() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return PlaidAccount;
        }(models_1.PlaidAccountModel));
        Models.PlaidAccount = PlaidAccount;
        var Credentials = (function (_super) {
            __extends(Credentials, _super);
            function Credentials() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Credentials;
        }(models_1.CredentialsModel));
        Models.Credentials = Credentials;
    })(Models = SDK.Models || (SDK.Models = {}));
    var Enums;
    (function (Enums) {
        Enums.NewAccountTypes = models_1.AccountTypes;
        Enums.NewCredentialTypes = models_1.CredentialTypes;
    })(Enums = SDK.Enums || (SDK.Enums = {}));
    var Gem = (function () {
        function Gem(config) {
            var _this = this;
            this.client = null;
            this.getDocumentContentLength = function (document) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, new Promise(function (resolve, reject) {
                                return document.getLength(function (err, length) {
                                    return err ? reject(err) : resolve(length);
                                });
                            })];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.listApplicationConfigurations = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get(shared_1.Endpoints.application_configurations)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.createUser = function (emailAddress) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.post(shared_1.Endpoints.users, __assign({}, (emailAddress && { email: emailAddress })))];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.createUserConsent = function (userId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.put(shared_1.Endpoints.users + "/" + userId + "/consent")];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.updateUser = function (args) { return __awaiter(_this, void 0, void 0, function () {
                var userId, phoneNumber, consented;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = args.userId, phoneNumber = args.phoneNumber, consented = args.consented;
                            return [4, this.client.put(shared_1.Endpoints.users + "/" + userId, {
                                    consented: consented,
                                    phone_number: phoneNumber,
                                })];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.listUsers = function (args) {
                if (args === void 0) { args = {}; }
                return __awaiter(_this, void 0, void 0, function () {
                    var page, size;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                page = args.pageNumber, size = args.pageSize;
                                return [4, this.client.get(shared_1.Endpoints.users, { page: page, size: size })];
                            case 1: return [2, _a.sent()];
                        }
                    });
                });
            };
            this.getUser = function (userId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get(shared_1.Endpoints.users + "/" + userId)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.deleteUser = function (userId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.delete(shared_1.Endpoints.users + "/" + userId)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.sendUserSMSOTP = function (userId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post(shared_1.Endpoints.users + "/" + userId + "/send_sms", {})];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.verifyUserSMSOTP = function (userId, otp) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.post(shared_1.Endpoints.users + "/" + userId + "/verify_sms", {
                                otp_code: otp,
                            })];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.listProfiles = function (userId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get(shared_1.Endpoints.profiles, { user_id: userId })];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.getProfile = function (profileId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get(shared_1.Endpoints.profiles + "/" + profileId)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.deleteProfile = function (profileId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.delete(shared_1.Endpoints.profiles + "/" + profileId)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.updateProfile = function (profileId, profile) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.put(shared_1.Endpoints.profiles + "/" + profileId, profile)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.createProfile = function (userId, profile) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.post(shared_1.Endpoints.profiles, profile, {
                                qs: { user_id: userId },
                            })];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.createTemporaryProfile = function (userId, profile) { return __awaiter(_this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = shared_1.Endpoints.profiles + "/temporary";
                            return [4, this.client.post(url, profile, {
                                    qs: { user_id: userId },
                                })];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.verifyProfileKYC = function (_a) {
                var profileId = _a.profileId, _b = _a.documents, documents = _b === void 0 ? [] : _b, kyc_verifier = _a.kycVerifier, onSuccess = _a.onSuccess;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4, this.client.post(shared_1.Endpoints.profiles + "/" + profileId + "/check", __assign({ documents: documents }, (onSuccess && { on_success: onSuccess })), {
                                    qs: {
                                        kyc_verifier: kyc_verifier,
                                    },
                                })];
                            case 1: return [2, _c.sent()];
                        }
                    });
                });
            };
            this.listProfileVerifications = function (_a) {
                var profileId = _a.profileId;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, this.client.get(shared_1.Endpoints.profiles + "/" + profileId + "/verifications")];
                            case 1: return [2, _b.sent()];
                        }
                    });
                });
            };
            this.listProfileDocuments = function (profileId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get(shared_1.Endpoints.profiles + "/" + profileId + "/documents")];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.createProfileDocument = function (profileId, document) { return __awaiter(_this, void 0, void 0, function () {
                var url, _a, _b, _c, _d, _e, _f, _g, _h, _j;
                return __generator(this, function (_k) {
                    switch (_k.label) {
                        case 0:
                            url = shared_1.Endpoints.profiles + "/" + profileId + "/documents";
                            _b = (_a = this.client).post;
                            _c = [url, document];
                            _d = {};
                            _e = [{}];
                            _f = this.client.IS_NODE;
                            if (!_f) return [3, 2];
                            _g = [__assign({}, document.getHeaders())];
                            _h = {};
                            _j = 'Content-Length';
                            return [4, this.getDocumentContentLength(document)];
                        case 1:
                            _f = __assign.apply(void 0, _g.concat([(_h[_j] = _k.sent(), _h)]));
                            _k.label = 2;
                        case 2: return [4, _b.apply(_a, _c.concat([(_d.headers = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_f)])), { 'Content-Type': 'multipart/form-data' }]),
                                    _d)]))];
                        case 3: return [2, _k.sent()];
                    }
                });
            }); };
            this.deleteDocument = function (documentId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.delete(shared_1.Endpoints.documents + "/" + documentId)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.updateDocument = function (documentId, document) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                return __generator(this, function (_k) {
                    switch (_k.label) {
                        case 0:
                            _b = (_a = this.client).put;
                            _c = [shared_1.Endpoints.documents + "/" + documentId, document];
                            _d = {};
                            _e = [{}];
                            _f = this.client.IS_NODE;
                            if (!_f) return [3, 2];
                            _g = [__assign({}, document.getHeaders())];
                            _h = {};
                            _j = 'Content-Length';
                            return [4, this.getDocumentContentLength(document)];
                        case 1:
                            _f = __assign.apply(void 0, _g.concat([(_h[_j] = _k.sent(), _h)]));
                            _k.label = 2;
                        case 2: return [4, _b.apply(_a, _c.concat([(_d.headers = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_f)])), { 'Content-Type': 'multipart/form-data' }]),
                                    _d)]))];
                        case 3: return [2, _k.sent()];
                    }
                });
            }); };
            this.verifyInstitution2fa = function (_a) {
                var value = _a.value, two_factor_id = _a.two_factor_id;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, this.client.post(shared_1.Endpoints.intstitution_2fa + "/" + two_factor_id + "/verify", { value: value })];
                            case 1: return [2, _b.sent()];
                        }
                    });
                });
            };
            this.listInstitution2fas = function (_a) {
                var resourceId = _a.resourceId;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, this.client.get(shared_1.Endpoints.intstitution_2fa, {
                                    resource_id: resourceId,
                                })];
                            case 1: return [2, _b.sent()];
                        }
                    });
                });
            };
            this.listInstitutions = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get(shared_1.Endpoints.institutions)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.getInstitution = function (institutionId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get(shared_1.Endpoints.institutions + "/" + institutionId)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.createInstitutionUser = function (profileId, institutionId) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.post(shared_1.Endpoints.institution_users, {
                                profile_id: profileId,
                                institution_id: institutionId,
                            })];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.updateInstitutionUser = function (institutionUserId, profileId) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.put(shared_1.Endpoints.institution_users + "/" + institutionUserId, {
                                profile_id: profileId,
                            })];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.getInstitutionUser = function (institutionUserId) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.get(shared_1.Endpoints.institution_users + "/" + institutionUserId)];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.listInstitutionUsers = function (user_id, profile_id) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.get("" + shared_1.Endpoints.institution_users, {
                                user_id: user_id,
                                profile_id: profile_id,
                            })];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.createAccount = function (account) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.post("" + shared_1.Endpoints.accounts, account, {
                                isPCI: account.type === models_1.AccountTypes.WyreCardAccount,
                            })];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.getAccount = function (accountId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get(shared_1.Endpoints.accounts + "/" + accountId)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.listAccounts = function (userId) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.get("" + shared_1.Endpoints.accounts, {
                                user_id: userId,
                            })];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.deleteAccount = function (accountId) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.delete(shared_1.Endpoints.accounts + "/" + accountId)];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.createTransaction = function (transactionParams) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post("" + shared_1.Endpoints.transactions, transactionParams)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.confirmTransaction = function (transactionId, cvc) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.post(shared_1.Endpoints.transactions + "/" + transactionId, __assign({}, (cvc && { cvc: cvc })))];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.listTransactions = function (params) { return __awaiter(_this, void 0, void 0, function () {
                var query;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = {};
                            if (params) {
                                params.userId && (query.user_id = params.userId);
                                params.accountId && (query.account_id = params.accountId);
                                params.beforeId && (query.before_id = params.beforeId);
                                params.afterId && (query.after_id = params.afterId);
                                params.limit && (query.limit = params.limit);
                            }
                            return [4, this.client.get("" + shared_1.Endpoints.transactions, query)];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.getTransaction = function (transactionId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get(shared_1.Endpoints.transactions + "/" + transactionId)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.listTransactionPending2fas = function (_a) {
                var transactionId = _a.transactionId;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, this.client.get(shared_1.Endpoints.transactions + "/" + transactionId + "/2fa_requirements")];
                            case 1: return [2, _b.sent()];
                        }
                    });
                });
            };
            this.createCredentials = function (credentialParams) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.post("" + shared_1.Endpoints.credentials, credentialParams)];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.createConnection = function (args) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post(shared_1.Endpoints.connections, args)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.updateConnection = function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.put(shared_1.Endpoints.connections + "/" + args.connection_id, args)];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.listConnections = function (userId) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.get(shared_1.Endpoints.connections, {
                                qs: { user_id: userId },
                            })];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.getConnection = function (connectionId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get(shared_1.Endpoints.connections + "/" + connectionId)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.deleteConnection = function (connectionId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.delete(shared_1.Endpoints.connections + "/" + connectionId)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.listAssets = function (category) {
                if (category === void 0) { category = 'cryptocurrency'; }
                return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.get("" + shared_1.Endpoints.assets, { category: category })];
                        case 1: return [2, _a.sent()];
                    }
                }); });
            };
            this.getAsset = function (assetId, source) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.get(shared_1.Endpoints.assets + "/" + assetId + (source ? '/' + source : ''))];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.listSupportedCurrencies = function (institutionId) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.get(shared_1.Endpoints.institutions + "/" + institutionId + "/supported_currencies")];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.listAssetPrices = function (_a) {
                var asset_ids = _a.asset_ids, currency_id = _a.currency_id, source = _a.source, sources = _a.sources;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, this.client.get(shared_1.Endpoints.prices, {
                                    currency_id: currency_id,
                                    asset_ids: asset_ids,
                                    source: source,
                                    sources: source || sources,
                                })];
                            case 1: return [2, _b.sent()];
                        }
                    });
                });
            };
            this.getAssetPrice = function (_a) {
                var asset_id = _a.asset_id, currency_id = _a.currency_id, source = _a.source;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, this.client.get(shared_1.Endpoints.assets + "/" + asset_id, {
                                    currency_id: currency_id,
                                    sources: source,
                                })];
                            case 1: return [2, _b.sent()];
                        }
                    });
                });
            };
            this.findOrCreateUser = function (_a) {
                var email = _a.email, userId = _a.userId, reCAPTCHAValue = _a.reCAPTCHAValue;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, this.client.post("" + shared_1.Endpoints.users, __assign({ email: email, user_id: userId }, (!this.client.IS_NODE && { 'g-recaptcha-response': reCAPTCHAValue })))];
                            case 1: return [2, _b.sent()];
                        }
                    });
                });
            };
            this.logOutUser = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.delete("" + shared_1.Endpoints.logout, {})];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.emailOTP = function (_a) {
                var userId = _a.userId, email = _a.email, reCAPTCHAValue = _a.reCAPTCHAValue;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, this.client.post(shared_1.Endpoints.otp + "/email_otp", __assign(__assign({ email: email }, (userId && { user_id: userId })), (!this.client.IS_NODE && { 'g-recaptcha-response': reCAPTCHAValue })))];
                            case 1: return [2, _b.sent()];
                        }
                    });
                });
            };
            this.verifyOTP = function (_a) {
                var email = _a.email, userId = _a.userId, otpCode = _a.otpCode;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, this.client.post(shared_1.Endpoints.otp + "/verify_otp", __assign({ email: email, otp_code: otpCode }, (userId && { user_id: userId })))];
                            case 1: return [2, _b.sent()];
                        }
                    });
                });
            };
            this.checkSessionValidity = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post(shared_1.Endpoints.session_validity)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.refreshSession = function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.post(shared_1.Endpoints.refresh, {})];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
            this.generateOnfidoSDKToken = function (_a) {
                var profileId = _a.profileId;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (this.client.IS_NODE)
                                    return [2, Promise.reject('This request can only be made from a browser.')];
                                return [4, this.client.post(shared_1.Endpoints.profiles + "/" + profileId + "/sdk_session", {}, { qs: { kyc_verifier: 'onfido' } })];
                            case 1: return [2, _b.sent()];
                        }
                    });
                });
            };
            this.client = new client_1.Client(config);
            this.rawAxios = this.client.axios;
        }
        return Gem;
    }());
    SDK.Gem = Gem;
})(SDK = exports.SDK || (exports.SDK = {}));
