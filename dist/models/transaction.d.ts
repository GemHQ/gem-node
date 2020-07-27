import { BlockchainAddress } from './shared';
export interface ITransaction {
    source_id: string;
    source_amount: number;
    source_asset_id?: string;
    type: string;
    preview?: boolean;
    blockchain_address: BlockchainAddress;
}
export declare class TransactionModel implements ITransaction {
    source_id: string;
    source_asset_id?: string;
    source_amount: number;
    type: string;
    preview?: boolean;
    blockchain_address: BlockchainAddress;
    constructor({ source_id, source_asset_id, type, source_amount, preview, blockchain_address, }: ITransaction);
}
