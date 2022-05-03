import { WorldInterface } from './world.interface';

export interface WorldsSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: WorldInterface;
    }>;
  };
}
