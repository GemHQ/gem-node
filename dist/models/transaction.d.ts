import { IAmount } from './amount';
import { Destination } from './shared';
export interface ITransaction {
    source_id: string;
    type: string;
    fees_inclusive: boolean;
    destination: Destination;
    amount: IAmount;
}
export declare class TransactionModel implements ITransaction {
    source_id: string;
    type: string;
    fees_inclusive: boolean;
    amount: IAmount;
    destination: Destination;
    constructor({ source_id, type, fees_inclusive, amount, destination, }: ITransaction);
}
