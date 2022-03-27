import { Entity, Column, PrimaryColumn } from 'typeorm';
import { WorldInterface } from './world.interface';

@Entity()
export class World implements WorldInterface {
  @PrimaryColumn()
  id: string;

  @Column()
  worldName: string;

  @Column()
  authorId: string;

  @Column()
  authorName: string;

  @Column()
  imageUrl: string;

  @Column()
  thumbnailImageUrl: string;
}
