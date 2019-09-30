"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProfileModel = (function () {
    function ProfileModel(_a) {
        var name = _a.name, phone_number = _a.phone_number, address = _a.address, email_address = _a.email_address, social_security_number = _a.social_security_number, date_of_birth = _a.date_of_birth;
        this.name = name;
        this.phone_number = phone_number;
        this.address = address;
        this.email_address = email_address;
        this.social_security_number = social_security_number;
        this.date_of_birth = date_of_birth;
    }
    return ProfileModel;
}());
exports.ProfileModel = ProfileModel;