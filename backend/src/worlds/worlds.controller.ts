import { Controller, Get, Query } from '@nestjs/common';
import { World } from './world.entity';
import { WorldsService } from './worlds.service';

@Controller('worlds')
export class WorldsController {
  constructor(private readonly worldService: WorldsService) { }

  @Get()
  async getWorlds(
    @Query('authorId') authorId: string,
    @Query('tags') tags: string[],
    @Query('texts') texts: string[],
    @Query('supportQuest') supportQuest: string,
    @Query('page') page: string,
  ): Promise<Array<World>> {
    return this.worldService.search({
      authorId,
      tags,
      texts,
      supportQuest: supportQuest === 'true',
      page: Number(page),
    });
  }
}
