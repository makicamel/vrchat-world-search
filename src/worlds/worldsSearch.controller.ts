import { Controller, Get, Query } from '@nestjs/common';
import { World } from './world.entity';
import { WorldsSearchService } from './worldsSearch.service';

@Controller('worlds')
export class WorldsSearchController {
  constructor(private readonly worldService: WorldsSearchService) { }

  @Get()
  async getWorlds(@Query('search') search): Promise<Array<World>> {
    if (search) {
      return this.worldService.search(search);
    }
    return this.worldService.search('');
  }
}
