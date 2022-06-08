import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { World } from './world.entity';

@Injectable()
export class WorldsService {
  index = 'worlds';
  constructor(private readonly elasticsearchService: ElasticsearchService) { }

  async search({ page, authorId, supportQuest }: {
    page: number,
    authorId?: string,
    supportQuest?: boolean,
  }): Promise<Array<World>> {
    const response = await this.elasticsearchService.search<World>({
      index: this.index,
      body: {
        query: this.#query({
          authorId, supportQuest
        })
      },
      sort: 'updatedAt:desc',
      from: page * 10,
    })
    const hits = response.hits.hits;
    return hits.map((world) => world._source);
  }

  #query({ text, authorId, supportQuest }: {
    text?: string, authorId?: string, supportQuest?: boolean
  }) {
    let query = []
    if (text) {
      query.push({
        multi_match: {
          query: text,
          fields: ['worldName', 'authorName'],
        }
      })
    }
    if (supportQuest) { query.push({ term: { supportQuest } }) }
    if (authorId) { query.push({ term: { authorId } }) }

    if (query.length === 0) {
      return { match_all: {} }
    } else {
      return { bool: { must: query } }
    }
  }
}
