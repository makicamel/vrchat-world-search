import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { WorldsInterface } from './worlds.interface';

@Injectable()
export class WorldsService {
  index: 'worlds';
  constructor(private readonly elasticsearchService: ElasticsearchService) { }

  async search(): Promise<Array<WorldsInterface>> {
    const response = await this.elasticsearchService.search<WorldsInterface>({
      index: this.index,
      query: {
        match: { authorName: 'foo' },
      },
    });
    const hits = response.hits.hits;
    return hits.map((world) => world._source);
  }
}
