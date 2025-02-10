export class Utils {
  static normalizeData(data: any[]): any[] {
    const uniqueData = new Map();
    data.forEach((row) => {
      const name = row['Name'];
      if (!name) return;
      uniqueData.set(name, {
        name,
        updated_at: this.formatDate(row['Updated At']),
        prices: this.normalizePrices(row['Prices']),
        rate: row['Rate'] || 0,
        category: this.detectCategory(name),
      });
    });
    return Array.from(uniqueData.values());
  }

  static formatDate(date: any): string {
    return new Date(date).toISOString().split('T')[0];
  }

  static normalizePrices(prices: any): number[] {
    return String(prices)
      .split(',')
      .map((price: string) => Math.max(0, parseFloat(price.trim())));
  }

  static detectCategory(name: string): 'product' | 'equipment' {
    return name.toLowerCase().includes('equipment') ? 'equipment' : 'product';
  }
}
