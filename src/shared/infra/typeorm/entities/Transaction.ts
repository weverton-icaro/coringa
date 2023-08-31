import moment from 'moment-timezone';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  transactionUuid: string;

  @Column()
  roundClosed: boolean;

  @Column()
  supplierUser: string;

  @Column()
  round: string;

  @Column()
  gameId: number;

  @Column()
  isFree: boolean;

  @Column()
  gameCode: string;

  @Column()
  currency: string;

  @Column()
  requestUuid: string;

  @Column()
  campaignUuid: string;

  @Column()
  rewardUuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  bet: string;

  @Column()
  amount: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  insertCreated() {
    this.createdAt = new Date(moment().tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss"));
    this.updatedAt = new Date(moment().tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss"));
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updatedAt = new Date(moment().tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss"));
  }

}