import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { WorldsSearchResult } from './types/worldsSearchResult.interface';

@Injectable()
export class WorldsSearchService {
  index: 'worlds';
  constructor(private readonly elasticsearchService: ElasticsearchService) { }

  async search(): Promise<Array<WorldsSearchResult>> {
    const response = await this.elasticsearchService.search<WorldsSearchResult>(
      {
        index: this.index,
        query: {
          match: { authorName: 'foo' },
        },
      },
    );
    const hits = response.hits.hits;
    return hits.map((world) => world._source);
  }
}
