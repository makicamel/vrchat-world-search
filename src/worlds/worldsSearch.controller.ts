import { Controller, Get } from '@nestjs/common';
import { WorldsSearchResult } from './types/worldsSearchResult.interface';
import { WorldsSearchService } from './worldsSearch.service';

@Controller('worlds')
export class WorldsSearchController {
  constructor(private readonly worldService: WorldsSearchService) { }

  @Get()
  async index(): Promise<string> {
    const worlds: Array<WorldsSearchResult> = await this.worldService.search();
    return worlds.join('\n');
  }
}
