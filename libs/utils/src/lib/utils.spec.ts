import { Item } from '@miniprojet/models';
import { Utils } from './utils';

describe('Utils', () => {
  describe('normalizeData', () => {
    it('should normalize product and equipment data correctly', () => {
      const data = [
        ['','name', '', '', 'rate %'],
        ['','Product A', '9/14/2025', '100,5;200,7', 10],
        ['','Product B', '8/1/2019', '300,2;400,3', 15],
        ['','name', '12/19/1993', '-5', 'rate'],
        ['','Equipment A', '1/13/1998', '500,1;600,8', 5],
      ];

      const result = Utils.normalizeData(data);

      expect(result).toEqual([
        new Item(
          'Product A',
          expect.any(String),
          [100.5, 200.7],
          10,
          'product'
        ),
        new Item(
          'Product B',
          expect.any(String),
          [300.2, 400.3],
          15,
          'product'
        ),
        new Item(
          'Equipment A',
          expect.any(String),
          [500.1, 600.8],
          5,
          'equipment'
        ),
      ]);
    });
  });

  describe('getNormalizedItems', () => {
    it('should return a properly formatted Item', () => {
      const item = Utils.getNormalizedItems(
        'Joint',
        new Date('9/14/2025'),
        '100;-10',
        5,
        'product'
      );
      expect(item).toEqual(
        new Item('Joint', '2025-09-14', [100, 0], 5, 'product')
      );
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      expect(Utils['formatDate'](new Date('9/14/2025'))).toBe('2025-09-14');
    });
  });

  describe('normalizePrices', () => {
    it('should correctly convert price strings to numbers', () => {
      expect(Utils['normalizePrices']('100,5;200,7')).toEqual([100.5, 200.7]);
    });
  });

  describe('filterDoubleItems', () => {
    it('should remove duplicate items with older updated_at values', () => {
      const items = [
        new Item('Item A', '2024-02-10', [100], 5, 'product'),
        new Item('Item A', '2024-02-09', [100], 5, 'product'),
        new Item('Item B', '2024-02-08', [200], 10, 'equipment'),
      ];
      const result = Utils['filterDoubleItems'](items);
      expect(result).toEqual([
        new Item('Item A', '2024-02-10', [100], 5, 'product'),
        new Item('Item B', '2024-02-08', [200], 10, 'equipment'),
      ]);
    });
  });

  describe('getProductHeaderRowIndex', () => {
    it('should return the correct index for product header', () => {
      const data = [['', 'name', '', '', 'rate %']];
      expect(Utils['getProductHeaderRowIndex'](data)).toBe(0);
    });
  });

  describe('getEquipmentHeaderRowIndex', () => {
    it('should return the correct index for equipment header', () => {
      const data = [['', 'name', '', '', 'rate']];
      expect(Utils['getEquipmentHeaderRowIndex'](data)).toBe(0);
    });
  });
});
