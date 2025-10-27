// src/tasks/dto/create-task.dto.ts
import { IsNotEmpty, IsEnum, IsDateString, IsInt } from "class-validator";

import { TaskType, TaskStatus } from "../entities/task.entity";

export class CreateTaskDto {
  @IsInt({ message: "propertyId must be an integer" })
  propertyId: number;
  @IsNotEmpty({ message: "Description cannot be empty" })
  description: string;

  @IsEnum(TaskType, {
    message: `Type must be one of the following values: ${Object.values(TaskType).join(", ")}`,
  })
  type: TaskType;

  @IsNotEmpty({ message: "Task must be assigned to someone" })
  assignedTo: string;

  @IsEnum(TaskStatus, {
    message: `Status must be one of the following values: ${Object.values(TaskStatus).join(", ")}`,
  })
  status: TaskStatus;

  @IsDateString({}, { message: "Date must be a valid ISO 8601 date string" })
  date: string; // ISO string format
}
