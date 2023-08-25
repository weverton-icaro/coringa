import moment from "moment-timezone";

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
} from "typeorm";
import { User } from "./User";

@Entity("coins")
export default class Coins {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  isEnabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @BeforeInsert()
  insertCreated() {
    this.createdAt = new Date(
      moment().tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss")
    );
    this.updatedAt = new Date(
      moment().tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss")
    );
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updatedAt = new Date(
      moment().tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss")
    );
  }

}
