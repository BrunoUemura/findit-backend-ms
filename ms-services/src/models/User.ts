import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  user_photo: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  phone: string;

  @Column()
  occupation: string;

  @Column()
  about_me: string;

  @Column()
  email_verified: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
    this.email_verified = false;
  }
}
