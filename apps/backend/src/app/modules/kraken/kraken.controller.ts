import { Body, Controller, Logger, Post } from '@nestjs/common';
import { KrakenService } from './kraken.service';
import { Item } from './schemas/item.schema';

@Controller('kraken')
export class KrakenController {
  constructor(private readonly krakenService: KrakenService) {}

  @Post()
  async receiveData(@Body() items: Item[]) {
    Logger.log(`Received ${items.length} items`);
    await this.krakenService.saveItems(items);
    return { message: 'Data saved successfully!' };
  }
}
