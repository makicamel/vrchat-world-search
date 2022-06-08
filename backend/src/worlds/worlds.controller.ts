import { Controller, Get, Query } from '@nestjs/common';
import { World } from './world.entity';
import { WorldsService } from './worlds.service';

@Controller('worlds')
export class WorldsController {
  constructor(private readonly worldService: WorldsService) { }

  @Get()
  async getWorlds(
    @Query('authorId') authorId: string,
    @Query('supportQuest') supportQuest: boolean,
    @Query('page') page: number,
  ): Promise<Array<World>> {
    return this.worldService.search({
      authorId,
      supportQuest,
      page,
    });
  }
}
