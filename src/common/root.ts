import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Root extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
