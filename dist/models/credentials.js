"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CredentialsModel = (function () {
    function CredentialsModel(_a) {
        var institution_id = _a.institution_id, credential = _a.credential, credential_type = _a.credential_type;
        this.institution_id = institution_id;
        this.credential = credential;
        this.credential_type = credential_type;
    }
    return CredentialsModel;
}());
exports.CredentialsModel = CredentialsModel;
