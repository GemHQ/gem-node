export interface IAmount {
    asset_id: string;
    quantity: number;
}
export declare class AmountModel implements IAmount {
    asset_id: string;
    quantity: number;
    constructor({ asset_id, quantity }: IAmount);
}
