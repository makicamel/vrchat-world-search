import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { World } from './world.entity';

@Injectable()
export class WorldsService {
  index = 'worlds';
  constructor(private readonly elasticsearchService: ElasticsearchService) { }

  async getAllWorlds(): Promise<Array<World>> {
    const response = await this.elasticsearchService.search<World>({
      index: this.index,
      body: {
        query: {
          match_all: {},
        },
      },
      sort: 'updatedAt:desc',
    });
    const hits = response.hits.hits;
    return hits.map((world) => world._source);
  }

  async search(text: string): Promise<Array<World>> {
    const response = await this.elasticsearchService.search<World>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['worldName', 'authorName'],
          },
        },
      },
      sort: 'updatedAt:desc',
    });
    const hits = response.hits.hits;
    return hits.map((world) => world._source);
  }
}
