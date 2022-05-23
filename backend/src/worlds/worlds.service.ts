import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { World } from './world.entity';

@Injectable()
export class WorldsService {
  index = 'worlds';
  constructor(private readonly elasticsearchService: ElasticsearchService) { }

  async search(queries): Promise<Array<World>> {
    const response = await this.elasticsearchService.search<World>({
      index: this.index,
      body: { query: this.#query(queries) },
      sort: 'updatedAt:desc',
    })
    const hits = response.hits.hits;
    return hits.map((world) => world._source);
  }

  #query(query) {
    if (query.search) {
      return {
        multi_match: {
          query: query.search,
          fields: ['worldName', 'authorName'],
        },
      }
    } else {
      return { match_all: {}, }
    }
  }
}
