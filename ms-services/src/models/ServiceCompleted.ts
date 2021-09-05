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
import { User } from "./User";
import { Service } from "./Service";

@Entity("service_completed")
export class ServiceCompleted {
  @PrimaryColumn()
  id: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User)
  user: User;

  @JoinColumn({ name: "service_id" })
  @OneToOne(() => Service)
  service: Service;

  @Column()
  user_id: string;

  @Column()
  service_id: string;

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
