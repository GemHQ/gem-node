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
    })(Models = SDK.Models || (SDK.Models = {}));
    var Gem = (function () {
        function Gem(config) {
            var _this = this;
            this.client = null;
            this.createUser = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post(shared_1.Endpoints.users, {})];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.listUsers = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get(shared_1.Endpoints.users)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
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
            this.updateProfile = function (profileId, profile) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.put(shared_1.Endpoints.profiles + "/" + profileId, {}, {
                                form: profile,
                            })];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
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
            this.listProfileDocuments = function (profileId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get(shared_1.Endpoints.profiles + "/" + profileId + "/documents")];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            this.createProfileDocument = function (profileId, document) { return __awaiter(_this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = shared_1.Endpoints.profiles + "/" + profileId + "/documents";
                            return [4, this.client.post(url, {}, {
                                    formData: document.toFormData(),
                                })];
                        case 1: return [2, _a.sent()];
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
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.client.put(shared_1.Endpoints.documents + "/" + documentId, {}, {
                                formData: document.toFormData(),
                            })];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); };
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
                                institution_params: {
                                    id: institutionId,
                                },
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
            this.client = new client_1.Client(config);
        }
        return Gem;
    }());
    SDK.Gem = Gem;
})(SDK = exports.SDK || (exports.SDK = {}));