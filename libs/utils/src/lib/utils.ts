import { Item } from '@miniprojet/models';

export class Utils {
  static normalizeData(data: any[]): Item[] {
    const items: Item[] = data.map(
      (row) => new Item(row[0], row[1], row[2], row[3], 'equipment')
    );
    debugger;
    // const uniqueData = new Map();
    // data.forEach((row) => {
    //   const name = row['Name'];
    //   if (!name) return;
    //   uniqueData.set(name, {
    //     name,
    //     updated_at: this.formatDate(row['Updated At']),
    //     prices: this.normalizePrices(row['Prices']),
    //     rate: row['Rate'] || 0,
    //     category: this.detectCategory(name),
    //   });
    // });
    // return Array.from(uniqueData.values());
    return items;
  }

  private static isHeaderRow(row: any): boolean {
    return row;
  }

  private static formatDate(date: any): string {
    return new Date(date).toISOString().split('T')[0];
  }

  private static normalizePrices(prices: any): number[] {
    return String(prices)
      .split(',')
      .map((price: string) => Math.max(0, parseFloat(price.trim())));
  }

  private static detectCategory(name: string): 'product' | 'equipment' {
    return name.toLowerCase().includes('equipment') ? 'equipment' : 'product';
  }
}
