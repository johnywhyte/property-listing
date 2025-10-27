// src/tasks/tasks.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskEntity } from "./entities/task.entity";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Create a new task
  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.create(createTaskDto);
  }

  // Get all tasks
  @Get()
  findAll(): Promise<TaskEntity[]> {
    return this.tasksService.findAll();
  }

  // Get a single task by id
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): Promise<TaskEntity> {
    return this.tasksService.findOne(id);
  }

  // Update a task
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    return this.tasksService.update(id, updateTaskDto);
  }

  // Delete a task
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number): Promise<TaskEntity> {
    return this.tasksService.remove(id);
  }

  // List all tasks for a specific property
  @Get("property/:propertyId")
  findByProperty(
    @Param("propertyId", ParseIntPipe) propertyId: number,
  ): Promise<TaskEntity[]> {
    return this.tasksService.findByProperty(propertyId);
  }
}
