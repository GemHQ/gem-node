import { BlockchainAddress } from './shared';

export interface ITransaction {
  source_id: string;
  source_amount: number;
  type: string;
  preview?: boolean;
  blockchain_address: BlockchainAddress;
}

export class TransactionModel implements ITransaction {
  source_id: string;
  source_amount: number;
  type: string;
  preview?: boolean;
  blockchain_address: BlockchainAddress;

  constructor({
    source_id,
    type,
    source_amount,
    preview = false,
    blockchain_address,
  }: ITransaction) {
    this.source_id = source_id;
    this.type = type;
    this.source_amount = source_amount;
    this.preview = preview;
    this.blockchain_address = blockchain_address;
  }
}
