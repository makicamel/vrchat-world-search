import { Test, TestingModule } from '@nestjs/testing';
import { WorldsSearchController } from './worldsSearch.controller';

describe('WorldsController', () => {
  let controller: WorldsSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorldsSearchController],
    }).compile();

    controller = module.get<WorldsSearchController>(WorldsSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
