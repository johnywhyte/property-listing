import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { PropertyEntity } from "../../properties/entities/property.entity";

export enum TaskType {
  CLEANING = "cleaning",
  MAINTENANCE = "maintenance",
  INSPECTION = "inspection",
}

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in progress",
  DONE = "done",
}

@Entity("tasks")
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PropertyEntity, (property) => property.tasks, {
    onDelete: "CASCADE",
  })
  property: PropertyEntity;

  @Column()
  description: string;

  @Column({ type: "enum", enum: TaskType })
  type: TaskType;

  @Column()
  assignedTo: string;

  @Column({ type: "enum", enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column()
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
