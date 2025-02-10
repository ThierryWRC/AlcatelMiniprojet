import { Item } from '@miniprojet/models';

export class Utils {
  static normalizeData(data: any[]): Item[] {
    const items: Item[] = [];
    const productIndex = this.getProductHeaderRowIndex(data);
    const equipmentIndex = this.getEquipmentHeaderRowIndex(data);
    data.forEach((row, index) => {
      if (
        index > productIndex &&
        (index < equipmentIndex || productIndex > equipmentIndex)
      ) {
        items.push(new Item(row[1], row[2], row[3], row[4], 'product'));
      } else if (
        index > equipmentIndex &&
        (index < productIndex || equipmentIndex > productIndex)
      ) {
        items.push(new Item(row[1], row[2], row[3], row[4], 'equipment'));
      }
    });
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

  private static getProductHeaderRowIndex(rows: any[]): number {
    return rows.findIndex((row) => this.isProductHeaderRow(row));
  }

  private static isProductHeaderRow(row: any): boolean {
    return row[1].toLowerCase() === 'name' && row[4].toLowerCase() === 'rate %';
  }

  private static getEquipmentHeaderRowIndex(rows: any[]): number {
    return rows.findIndex((row) => this.isEquipmentHeaderRow(row));
  }

  private static isEquipmentHeaderRow(row: any): boolean {
    return row[1].toLowerCase() === 'name' && row[4].toLowerCase() === 'rate';
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
