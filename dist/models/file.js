"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModel = void 0;
var FileModel = (function () {
    function FileModel(_a) {
        var media_type = _a.media_type, data = _a.data, description = _a.description, orientation = _a.orientation;
        this.media_type = media_type;
        this.data = data;
        this.description = description;
        this.orientation = orientation;
    }
    return FileModel;
}());
exports.FileModel = FileModel;
