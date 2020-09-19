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
var DocumentModel = (function () {
    function DocumentModel(_a) {
        var type = _a.type, files = _a.files, description = _a.description;
        this.files = [];
        this.type = type;
        this.files = files;
        this.description = description;
    }
    DocumentModel.prototype.toFormData = function () {
        if (!this.files) {
            throw new Error('No files provided for document.');
        }
        var fd = {};
        this.files.forEach(function (_a, index) {
            var media_type = _a.media_type, data = _a.data, description = _a.description, orientation = _a.orientation;
            fd["files[" + index + "][media_type]"] = media_type;
            fd["files[" + index + "][data]"] = data;
            fd["files[" + index + "][description]"] = description || '';
            fd["files[" + index + "][orientation]"] = orientation || '';
        });
        var result = __assign(__assign({}, this), fd);
        delete result.files;
        return result;
    };
    return DocumentModel;
}());
exports.DocumentModel = DocumentModel;
