import { IAmount } from './amount';
import { Destination } from './shared';

export interface ITransaction {
  source_id: string;
  type: string;
  fees_inclusive?: boolean;
  destination: Destination;
  amount: IAmount;
}

export class TransactionModel implements ITransaction {
  source_id: string;
  type: string;
  fees_inclusive?: boolean;
  amount: IAmount;
  destination: Destination;

  constructor({
    source_id,
    type,
    fees_inclusive = false,
    amount,
    destination,
  }: ITransaction) {
    this.source_id = source_id;
    this.type = type;
    this.fees_inclusive = fees_inclusive;
    this.amount = amount;
    this.destination = destination;
  }
}
