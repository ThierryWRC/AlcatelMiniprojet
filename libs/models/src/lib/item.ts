export type CATEGORY_TYPE = 'product' | 'equipment';

export class Item {
  name!: string;
  updated_at!: string;
  prices!: number[];
  rate!: number;
  category!: CATEGORY_TYPE;

  constructor(
    name: string,
    updated_at: string,
    prices: number[],
    rate: number,
    category: CATEGORY_TYPE
  ) {
    this.name = name;
    this.updated_at = updated_at;
    this.prices = prices;
    this.rate = rate;
    this.category = category;
  }

  static parse(json: any): Item {
    return new Item(
      json.name,
      json.updated_at,
      json.prices,
      json.rate,
      json.category
    );
  }
}
