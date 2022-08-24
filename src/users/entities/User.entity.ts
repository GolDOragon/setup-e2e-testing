import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { Root } from '../../common/root';

@Entity()
export class User extends Root {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ type: 'int', default: 1 })
  version: number;
}
