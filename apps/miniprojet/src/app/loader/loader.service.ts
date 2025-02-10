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
        resolve(json);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
}
