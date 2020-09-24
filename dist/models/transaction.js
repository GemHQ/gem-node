"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
var TransactionModel = (function () {
    function TransactionModel(_a) {
        var source_id = _a.source_id, source_asset_id = _a.source_asset_id, type = _a.type, source_amount = _a.source_amount, _b = _a.preview, preview = _b === void 0 ? false : _b, blockchain_address = _a.blockchain_address;
        this.source_id = source_id;
        this.source_asset_id = source_asset_id;
        this.type = type;
        this.source_amount = source_amount;
        this.preview = preview;
        this.blockchain_address = blockchain_address;
    }
    return TransactionModel;
}());
exports.TransactionModel = TransactionModel;
