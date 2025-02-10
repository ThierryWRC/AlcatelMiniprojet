import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './schemas/item.schema';

@Injectable()
export class KrakenService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async saveItems(items: Item[]): Promise<void> {
    for (const item of items) {
      Logger.log(`Saving item ${item.name}`);
      await this.itemModel.findOneAndUpdate({ name: item.name }, item, {
        upsert: true,
      });
    }
  }
}
