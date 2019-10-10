export interface IAmount {
  asset_id: string;
  quantity: number;
}

export class AmountModel implements IAmount {
  asset_id: string;
  quantity: number;

  constructor({ asset_id, quantity }: IAmount) {
    this.asset_id = asset_id;
    this.quantity = quantity;
  }
}
