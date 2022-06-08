import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { World } from './world.entity';

@Injectable()
export class WorldsService {
  index = 'worlds';
  constructor(private readonly elasticsearchService: ElasticsearchService) { }

  async search({ page, authorId }: {
    page: number,
    authorId?: string,
  }): Promise<Array<World>> {
    const response = await this.elasticsearchService.search<World>({
      index: this.index,
      body: {
        query: this.#query({
          authorId,
        })
      },
      sort: 'updatedAt:desc',
      from: page * 10,
    })
    const hits = response.hits.hits;
    return hits.map((world) => world._source);
  }

  #query({ text, authorId }: {
    text?: string, authorId?: string,
  }) {
    if (authorId) {
      return {
        term: {
          authorId: authorId,
        }
      }
    } else if (text) {
      return {
        multi_match: {
          query: text,
          fields: ['worldName', 'authorName'],
        },
      }
    } else {
      return { match_all: {}, }
    }
  }
}
