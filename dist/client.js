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
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var shared_1 = require("./shared");
var request = require("request");
var url = require("url");
var gem_api_1 = require("./errors/gem_api");
var Client = (function () {
    function Client(config) {
        this.config = config;
        if (!config.secretKey)
            throw new Error('Gem API secret is missing');
        if (!config.apiKey)
            throw new Error('Gem API key is missing');
        this.config.options = this.config.options || {};
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
        if (!path)
            throw 'path required';
        var reqOpts = this.createRequestOptions(method, path, params, options);
        return new Promise(function (resolve, reject) {
            request(reqOpts, function (err, res) {
                if (err)
                    throw err;
                else if (res.statusCode >= 200 && res.statusCode < 300)
                    resolve(res.body || {});
                else
                    reject(new gem_api_1.default(res.body || { status: res.statusCode }));
            });
        });
    };
    Client.prototype.createRequestOptions = function (method, path, params, options) {
        options = options || {};
        var parsedUrl = url.parse(url.resolve(this.config.baseUrl || shared_1.GEM_BASE_URL, path), true);
        var json = !(options.headers || {}).hasOwnProperty('content-type') ||
            !(options.headers || {}).hasOwnProperty('Content-Type') ||
            options.headers['Content-Type'] == 'application/json';
        var reqOpts = __assign(__assign(__assign({}, this.config.options), options), { url: parsedUrl.protocol + '//' + parsedUrl.host + parsedUrl.pathname, method: method, headers: __assign(__assign({}, this.config.options.headers), options.headers), qs: __assign(__assign({}, this.config.qs), options.qs), json: json });
        if (reqOpts.method == 'GET')
            reqOpts.qs = Object.assign(reqOpts.qs, params);
        else
            reqOpts.body = params;
        if (!reqOpts.body || !Object.keys(reqOpts.body).length)
            delete reqOpts.body;
        var ts = this.getTimeStamp();
        reqOpts.headers['X-Gem-Access-Timestamp'] = ts;
        reqOpts.headers['X-Gem-Api-Key'] = this.config.apiKey;
        reqOpts.headers['X-Gem-Signature'] = this.createSignature(ts);
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
        return crypto
            .createHmac('sha256', secretKey)
            .update(data)
            .digest('hex');
    };
    return Client;
}());
exports.Client = Client;
