import { Controller, Get, Query } from '@nestjs/common';
import { World } from './world.entity';
import { WorldsService } from './worlds.service';

@Controller('worlds')
export class WorldsController {
  constructor(private readonly worldService: WorldsService) { }

  @Get()
  async getWorlds(@Query('search') search): Promise<Array<World>> {
    if (search) {
      return this.worldService.search(search);
    }
    return this.worldService.getAllWorlds();
  }
}
