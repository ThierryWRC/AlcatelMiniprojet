import { Injectable } from '@angular/core';
import { Item } from '@miniprojet/models';
import { Utils } from '@miniprojet/utils';
import * as ExcelJS from 'exceljs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  async parseExcelFile(file: File): Promise<Item[]> {
    return new Promise((resolve, reject) => {
      const workbook = new ExcelJS.Workbook();
      const reader = new FileReader();

      reader.onload = async () => {
        const buffer = reader.result as ArrayBuffer;
        await workbook.xlsx.load(buffer);
        const worksheet = workbook.getWorksheet(1);
        const lines: any[] = [];
        if (worksheet) {
          worksheet.eachRow((row) => {
            lines.push(row.values);
          });
        }
        resolve(Utils.normalizeData(lines));
      };
      reader.readAsArrayBuffer(file);
    });
  }
}
