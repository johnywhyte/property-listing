import { AppDataSource } from "./ormconfig";
import {
  PropertyEntity,
  PropertyStatus,
} from "./properties/entities/property.entity";
import { TaskEntity, TaskStatus, TaskType } from "./tasks/entities/task.entity";

async function seed() {
  await AppDataSource.initialize();

  const propertyRepo = AppDataSource.getRepository(PropertyEntity);
  const taskRepo = AppDataSource.getRepository(TaskEntity);

  // --- Step 1: Seed properties ---
  const properties: Partial<PropertyEntity>[] = [
    {
      name: "Flats Skyview",
      address: "Sukhumvit 24, Bangkok",
      ownerName: "John Doe",
      monthlyRent: 25000,
      status: PropertyStatus.VACANT,
    },
    {
      name: "City Loft",
      address: "Silom Road, Bangkok",
      ownerName: "Alice Smith",
      monthlyRent: 30000,
      status: PropertyStatus.OCCUPIED,
    },
    {
      name: "Riverside Condo",
      address: "Chao Phraya, Bangkok",
      ownerName: "Bob Johnson",
      monthlyRent: 28000,
      status: PropertyStatus.VACANT,
    },
  ];

  const savedProperties = await propertyRepo.save(properties);

  // --- Step 2: Seed tasks linked to properties ---
  const tasks: Partial<TaskEntity>[] = [
    {
      property: savedProperties[0],
      description: "Inspect air conditioner",
      type: TaskType.MAINTENANCE,
      assignedTo: "Technician A",
      status: TaskStatus.PENDING,
      date: new Date(),
    },
    {
      property: savedProperties[1],
      description: "Prepare lease renewal paperwork",
      type: TaskType.INSPECTION,
      assignedTo: "Manager B",
      status: TaskStatus.IN_PROGRESS,
      date: new Date(),
    },
    {
      property: savedProperties[2],
      description: "Clean rooftop area",
      type: TaskType.CLEANING,
      assignedTo: "Cleaner C",
      status: TaskStatus.DONE,
      date: new Date(),
    },
  ];

  await taskRepo.save(tasks);

  await AppDataSource.destroy();
  process.exit(0);
}

void seed();
