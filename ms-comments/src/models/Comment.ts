import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";

import { v4 as uuid } from "uuid";
import { Service } from "./Service";
import { User } from "./User";

@Entity("comments")
export class Comment {
  @PrimaryColumn()
  id: string;

  @JoinColumn({ name: "service_id" })
  @ManyToOne(() => Service)
  service: Service;

  @JoinColumn({ name: "sender_id" })
  @OneToOne(() => User)
  user: User;

  @Column()
  service_id: string;

  @Column()
  sender_id: string;

  @Column()
  comment: string;

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
