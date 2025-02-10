import { Controller, Get } from '@nestjs/common';
import { KrakenService } from './kraken.service';

@Controller('kraken')
export class KrakenController {
  constructor(private readonly krakenService: KrakenService) {}

  // @Post()
  // async receiveData(@Body() items: Item[]) {
  //   // await this.krakenService.saveItems(items);
  //   return { message: 'Data saved successfully!' };
  // }

  @Get()
  getMessage() {
    return { message: 'Hello from Kraken!' };
  }
}
