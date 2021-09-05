import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("chats")
export class Chat {
  @JoinColumn({ name: "sender_id" })
  @ManyToOne(() => User)
  user: User;

  @PrimaryColumn()
  id: string;

  @Column()
  sender_id: string;

  @Column()
  receiver_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
