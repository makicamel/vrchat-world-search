import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { World } from './world.entity';

@Injectable()
export class WorldsService {
  index = 'worlds';
  constructor(private readonly elasticsearchService: ElasticsearchService) { }

  async search(queries: {
    page: number,
  }): Promise<Array<World>> {
    const response = await this.elasticsearchService.search<World>({
      index: this.index,
      body: { query: this.#query(queries) },
      sort: 'updatedAt:desc',
      from: queries.page * 10,
    })
    const hits = response.hits.hits;
    return hits.map((world) => world._source);
  }

  #query(query: { text?: string, authorId?: string }) {
    if (query.authorId) {
      return {
        term: {
          authorId: query.authorId,
        }
      }
    } else if (query.text) {
      return {
        multi_match: {
          query: query.text,
          fields: ['worldName', 'authorName'],
        },
      }
    } else {
      return { match_all: {}, }
    }
  }
}
