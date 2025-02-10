import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KrakenController } from './kraken.controller';
import { KrakenService } from './kraken.service';
import { Item, ItemSchema } from './schemas/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [KrakenController],
  providers: [KrakenService],
})
export class KrakenModule {}
