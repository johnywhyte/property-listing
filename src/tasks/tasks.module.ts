// src/tasks/tasks.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { TaskEntity } from "./entities/task.entity";
import { PropertyEntity } from "../properties/entities/property.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, PropertyEntity])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
