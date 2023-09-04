import moment from 'moment-timezone';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Coin } from './Coin';
import { Game } from './Game';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(type => Coin)
  @JoinColumn({ name: 'coinId' })
  coin: Coin;

  @ManyToOne(type => Game)
  @JoinColumn({ name: 'gameId' })
  game: Game;

  @Column()
  token: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

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
