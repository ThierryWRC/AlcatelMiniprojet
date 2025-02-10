import { Injectable } from '@nestjs/common';

@Injectable()
export class KrakenService {
  // constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}
  // async saveItems(items: Item[]): Promise<void> {
  //   for (const item of items) {
  //     await this.itemModel.findOneAndUpdate({ name: item.name }, item, {
  //       upsert: true,
  //     });
  //   }
  // }
}
