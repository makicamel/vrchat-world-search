import { WorldInterface } from './types/world.interface';

export class World implements WorldInterface {
  id: string;
  worldName: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
  thumbnailImageUrl: string;
}
