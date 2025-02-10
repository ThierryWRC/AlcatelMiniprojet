import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KrakenModule } from './modules/kraken/kraken.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), KrakenModule],
})
export class AppModule {}
