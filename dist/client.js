"use strict";
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
exports.Client = void 0;
var crypto = require("crypto");
var shared_1 = require("./shared");
var url = require("url");
var gem_api_1 = require("./errors/gem_api");
var axios_1 = require("axios");
var qs = require("qs");
var EnvironmentURLs = {
    production: 'https://api.gem.co',
    sandbox: 'https://api.sandbox.gem.co',
};
var Client = (function () {
    function Client(config) {
        this.IS_NODE = true;
        this.config = {};
        this.checkForNodeProcess = function () {
            try {
                return typeof process !== 'undefined' && process.release.name === 'node';
            }
            catch (e) {
                return false;
            }
        };
        if (!config.apiKey)
            throw new Error('Gem SDK API key is missing');
        this.axios = axios_1.default.create();
        this.config = config;
        this.IS_NODE = this.checkForNodeProcess();
        this.config.options = this.config.options || {};
        this.config.baseUrl =
            EnvironmentURLs[this.config.environment] ||
                this.config.baseUrl ||
                EnvironmentURLs['production'];
        if (this.IS_NODE) {
            if (!config.secretKey) {
                throw new Error('Gem SDK API secret is missing');
            }
        }
    }
    Client.prototype.get = function (path, params, options) {
        return this.request('GET', path, params, options);
    };
    Client.prototype.post = function (path, body, options) {
        return this.request('POST', path, body, options);
    };
    Client.prototype.put = function (path, body, options) {
        return this.request('PUT', path, body, options);
    };
    Client.prototype.patch = function (path, body, options) {
        return this.request('PATCH', path, body, options);
    };
    Client.prototype.delete = function (path, body, options) {
        return this.request('DELETE', path, body, options);
    };
    Client.prototype.request = function (method, path, params, options) {
        if (params === void 0) { params = {}; }
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var reqOpts, _a, data, status, headers, e_1, res, data, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!path)
                            throw 'path required';
                        reqOpts = this.createRequestOptions(method, path, params, options);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.axios.request(reqOpts)];
                    case 2:
                        _a = _b.sent(), data = _a.data, status = _a.status, headers = _a.headers;
                        if (status >= 200 && status < 300) {
                            return [2, data || {}];
                        }
                        else {
                            throw new gem_api_1.default(__assign(__assign({}, data), { status: status,
                                headers: headers, base_url: this.config.baseUrl }));
                        }
                        return [3, 4];
                    case 3:
                        e_1 = _b.sent();
                        res = e_1.response;
                        if (res) {
                            data = res.data, status = res.status;
                            throw new gem_api_1.default(__assign(__assign({}, data), { status: status, headers: res.headers, base_url: this.config.baseUrl }));
                        }
                        else {
                            throw e_1;
                        }
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    Client.prototype.createRequestOptions = function (method, path, params, options) {
        if (params === void 0) { params = {}; }
        if (options === void 0) { options = {}; }
        var _a = options.isPCI, isPCI = _a === void 0 ? false : _a;
        var providedURL = this.config.baseUrl || shared_1.GEM_BASE_URL;
        providedURL = isPCI
            ? providedURL.replace(/:\/\/api\./g, '://api-pci.')
            : providedURL;
        var parsedUrl = url.parse(url.resolve(providedURL, path), true);
        var reqOpts = __assign(__assign(__assign(__assign({}, (!this.IS_NODE && {
            xsrfCookieName: shared_1.GEM_CSRF_COOKIE_NAME,
            xsrfHeaderName: shared_1.GEM_CSRF_HEADER_NAME,
        })), this.config.options), options), { url: parsedUrl.protocol + '//' + parsedUrl.host + parsedUrl.pathname, method: method, headers: __assign(__assign(__assign({}, this.axios.defaults.headers.common), this.config.options.headers), options.headers), qs: __assign(__assign({}, this.config.qs), options.qs), data: params });
        if (reqOpts.method == 'GET')
            reqOpts.qs = Object.assign(reqOpts.qs, params);
        if (['GET', 'DELETE'].includes(reqOpts.method))
            delete reqOpts.data;
        reqOpts.headers['X-Gem-Api-Key'] = this.config.apiKey;
        if (this.IS_NODE && !reqOpts.headers['Authorization']) {
            var ts = this.getTimeStamp();
            reqOpts.headers['X-Gem-Access-Timestamp'] = ts;
            reqOpts.headers['X-Gem-Signature'] = this.createSignature(ts);
        }
        reqOpts.url = (Object.keys(reqOpts.qs).length > 0
            ? reqOpts.url + '?' + qs.stringify(reqOpts.qs)
            : reqOpts.url).replace(/\?$/, '');
        shared_1.dbg('Request Options:', reqOpts);
        return reqOpts;
    };
    Client.prototype.getTimeStamp = function () {
        return Math.floor(Date.now() / 1000);
    };
    Client.prototype.createSignature = function (timeStamp) {
        shared_1.dbg('Timestamp:', timeStamp);
        var _a = this.config, secretKey = _a.secretKey, apiKey = _a.apiKey;
        var data = apiKey + ":" + timeStamp;
        return crypto.createHmac('sha256', secretKey).update(data).digest('hex');
    };
    return Client;
}());
exports.Client = Client;
