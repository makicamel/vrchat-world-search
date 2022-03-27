import { Controller, Get } from '@nestjs/common';
import { WorldsInterface } from './worlds.interface';
import { WorldsService } from './worlds.service';

@Controller('worlds')
export class WorldsController {
  constructor(private readonly worldService: WorldsService) { }

  @Get()
  async index(): Promise<string> {
    const worlds: Array<WorldsInterface> = await this.worldService.search();
    return worlds.join('\n');
  }
}
