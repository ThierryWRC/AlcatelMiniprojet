import { Module } from '@nestjs/common';
import { KrakenModule } from './modules/kraken/kraken.module';

@Module({
  imports: [KrakenModule],
})
export class AppModule {}
