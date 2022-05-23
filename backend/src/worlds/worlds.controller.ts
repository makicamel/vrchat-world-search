import { Controller, Get, Query } from '@nestjs/common';
import { World } from './world.entity';
import { WorldsService } from './worlds.service';

@Controller('worlds')
export class WorldsController {
  constructor(private readonly worldService: WorldsService) { }

  @Get()
  async getWorlds(
    @Query('text') text: string,
    @Query('authorId') authorId: string
  ): Promise<Array<World>> {
    const query = { text: text, authorId: authorId }

    return this.worldService.search(query);
  }
}
