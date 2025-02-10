import { Module } from '@nestjs/common';
import { KrakenController } from './kraken.controller';
import { KrakenService } from './kraken.service';

@Module({
  // imports: [
  //   MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  // ],
  controllers: [KrakenController],
  providers: [KrakenService],
})
export class KrakenModule {}
