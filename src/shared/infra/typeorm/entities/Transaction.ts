import moment from 'moment-timezone';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Session } from './Session';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  requestUuid: string;

  @Column()
  sessionId: number;

  @Column()
  amount: number;

  @Column()
  header: string;

  @Column()
  payload: string;

  @Column()
  response: string;

  @Column()
  responseHeader: string;

  @ManyToOne(type => Session)
  @JoinColumn({ name: "sessionId" })
  sessions: Session;

  @CreateDateColumn()
  createdAt: Date;

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