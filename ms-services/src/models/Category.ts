import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("categories")
export class Category {
  @PrimaryColumn()
  id: string;

  @Column()
  category: string;

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
