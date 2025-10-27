import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { TaskEntity } from "../../tasks/entities/task.entity";

export enum PropertyStatus {
  VACANT = "vacant",
  OCCUPIED = "occupied",
  MAINTENANCE = "maintenance",
}

@Entity("properties")
export class PropertyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  ownerName: string;

  @Column({ nullable: true })
  monthlyRent: number;

  @Column({
    type: "enum",
    enum: PropertyStatus,
    default: PropertyStatus.VACANT,
  })
  status: PropertyStatus;

  @OneToMany(() => TaskEntity, (task) => task.property)
  tasks: TaskEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
