import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class WorldsService {
  constructor(private readonly elasticsearchService: ElasticsearchService) { }
}
