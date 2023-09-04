import moment from 'moment-timezone';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Provider } from './Provider';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gameId: number;

  @Column()
  gameCode: string;

  @Column()
  enabled: boolean;

  @Column()
  category: string;

  @Column()
  urlThumb: string;

  @Column()
  urlSquareThumb: string;

  @Column()
  urlBackground: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => Provider)
  @JoinColumn({ name: 'ProviderId' })
  provider: Provider;

  @BeforeInsert()
  insertCreated() {
    this.createdAt = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    );
    this.updatedAt = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    );
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updatedAt = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    );
  }
}
