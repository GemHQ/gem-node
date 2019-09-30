"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require("debug");
exports.dbg = debug('gem:client');
exports.GEM_BASE_URL = 'https://vgs-sandbox.gem.co';
var Endpoints;
(function (Endpoints) {
    Endpoints["users"] = "/users";
    Endpoints["profiles"] = "/profiles";
    Endpoints["documents"] = "/documents";
    Endpoints["institutions"] = "/institutions";
    Endpoints["institution_users"] = "/institution_users";
})(Endpoints = exports.Endpoints || (exports.Endpoints = {}));