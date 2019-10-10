"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransactionModel = (function () {
    function TransactionModel(_a) {
        var source_id = _a.source_id, type = _a.type, fees_inclusive = _a.fees_inclusive, amount = _a.amount, destination = _a.destination;
        this.source_id = source_id;
        this.type = type;
        this.fees_inclusive = fees_inclusive;
        this.amount = amount;
        this.destination = destination;
    }
    return TransactionModel;
}());
exports.TransactionModel = TransactionModel;
