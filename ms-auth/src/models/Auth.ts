import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  DeleteDateColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("auth")
export class Auth {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  email_verified: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ default: null })
  deleted_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
    this.email_verified = false;
  }
}
