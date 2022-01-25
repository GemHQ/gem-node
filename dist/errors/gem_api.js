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
Object.defineProperty(exports, "__esModule", { value: true });
var GemAPIError = (function (_super) {
    __extends(GemAPIError, _super);
    function GemAPIError(error) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, error.error) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.description = error.description;
        _this.error = error.error;
        _this.status = error.status;
        _this.error_map = error.error_map;
        _this.requestId = error === null || error === void 0 ? void 0 : error.headers['x-request-id'];
        _this.api = error.baseUrl;
        return _this;
    }
    return GemAPIError;
}(Error));
exports.default = GemAPIError;
