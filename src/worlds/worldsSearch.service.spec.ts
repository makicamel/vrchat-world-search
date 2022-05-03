import { Test, TestingModule } from '@nestjs/testing';
import { WorldsSearchService } from './worldsSearch.service';

describe('WorldSearchService', () => {
  let service: WorldsSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorldsSearchService],
    }).compile();

    service = module.get<WorldsSearchService>(WorldsSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
