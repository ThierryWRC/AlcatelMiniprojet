import { Injectable } from '@angular/core';
import * as xlsx from 'xlsx';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  async parseExcelFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = xlsx.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(sheet);
        resolve(this.normalizeData(json));
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  private normalizeData(data: any[]): any[] {
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

  private formatDate(date: any): string {
    return new Date(date).toISOString().split('T')[0];
  }

  private normalizePrices(prices: any): number[] {
    return String(prices)
      .split(',')
      .map((price: string) => Math.max(0, parseFloat(price.trim())));
  }

  private detectCategory(name: string): 'product' | 'equipment' {
    return name.toLowerCase().includes('equipment') ? 'equipment' : 'product';
  }
}
