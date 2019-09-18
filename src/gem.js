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
exports.__esModule = true;
var request = require("request");
var crypto = require("crypto");
var url = require("url");
require("es6-shim");
var debug_1 = require("debug");
var dbg = debug_1["default"]('gem:client');
var GEM_BASE_URL = 'https://vgs-sandbox.gem.co';
var Client = /** @class */ (function () {
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
    Client.prototype["delete"] = function (path, body, options) {
        return this.request('DELETE', path, body, options);
    };
    /**
     * A base request factory.
     * @param method The HTTP method of the request.
     * @param path The Path for the request.
     * @param params Any request parameters.
     * @param options Options passed down from the high level request.
     */
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
                    reject(res.body || { status: res.statusCode });
            });
        });
    };
    /**
     * Construct request options for a new request.
     * @param method The HTTP method of the request.
     * @param path The Path for the request.
     * @param params Any request parameters.
     * @param options Options passed down from the high level request.
     */
    Client.prototype.createRequestOptions = function (method, path, params, options) {
        options = options || {};
        var parsedUrl = url.parse(url.resolve(this.config.baseUrl || GEM_BASE_URL, path), true);
        var json = !(options.headers || {}).hasOwnProperty('Content-Type') ||
            options.headers['Content-Type'] == 'application/json';
        var reqOpts = __assign(__assign(__assign({}, this.config.options), options), { url: parsedUrl.protocol + '//' + parsedUrl.host + parsedUrl.pathname, method: method, headers: __assign(__assign({}, this.config.options.headers), options.headers), qs: __assign(__assign({}, this.config.qs), options.qs), json: json });
        if (reqOpts.method == 'GET')
            reqOpts.qs = Object.assign(reqOpts.qs, params);
        else
            reqOpts.body = params;
        var ts = this.getTimeStamp();
        reqOpts.headers['X-Gem-Access-Timestamp'] = ts;
        reqOpts.headers['X-Gem-Api-Key'] = this.config.apiKey;
        reqOpts.headers['X-Gem-Signature'] = this.createSignature(ts);
        dbg('Request Options:', reqOpts);
        return reqOpts;
    };
    /**
     * Get the current unix timestamp (seconds)
     * for signing API requests.
     */
    Client.prototype.getTimeStamp = function () {
        return Math.ceil(Date.now() / 1000);
    };
    /**
     * Sign a request to Gem's API.
     * @param timeStamp Unix timestamp in seconds.
     */
    Client.prototype.createSignature = function (timeStamp) {
        dbg('Timestamp:', timeStamp);
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
