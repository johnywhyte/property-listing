// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TaskEntity } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { PropertyEntity } from "../properties/entities/property.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,

    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {}

  // Create a new task
  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const property = await this.propertyRepository.findOne({
      where: { id: createTaskDto.propertyId },
    });
    if (!property)
      throw new NotFoundException(
        `Property #${createTaskDto.propertyId} not found`,
      );

    const task = this.taskRepository.create({
      ...createTaskDto,
      property,
    });

    return this.taskRepository.save(task);
  }

  // Get all tasks
  async findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find({ relations: ["property"] });
  }

  // Get a single task
  async findOne(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ["property"],
    });
    if (!task) throw new NotFoundException(`Task #${id} not found`);
    return task;
  }

  // Update a task
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    const task = await this.findOne(id);

    if (updateTaskDto.propertyId) {
      const property = await this.propertyRepository.findOne({
        where: { id: updateTaskDto.propertyId },
      });
      if (!property)
        throw new NotFoundException(
          `Property #${updateTaskDto.propertyId} not found`,
        );
      task.property = property;
    }

    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  // Remove a task
  async remove(id: number): Promise<TaskEntity> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
    return task;
  }

  // List all tasks for a specific property
  async findByProperty(propertyId: number): Promise<TaskEntity[]> {
    return this.taskRepository.find({
      where: { property: { id: propertyId } },
      relations: ["property"],
    });
  }
}
