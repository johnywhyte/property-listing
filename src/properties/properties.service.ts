import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePropertyDto } from "./dto/create-property.dto";
import { UpdatePropertyDto } from "./dto/update-property.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PropertyEntity } from "./entities/property.entity";
import { PropertyStatus } from "./entities/property.entity";

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<PropertyEntity> {
    const property: PropertyEntity =
      this.propertyRepository.create(createPropertyDto);
    return await this.propertyRepository.save(property);
  }

  // async findAll(): Promise<PropertyEntity[]> {
  //   return await this.propertyRepository.find();
  // }

  async findAll(status?: PropertyStatus): Promise<PropertyEntity[]> {
    if (status) {
      return await this.propertyRepository.find({ where: { status } });
    }
    return await this.propertyRepository.find();
  }

  async findOne(id: number): Promise<PropertyEntity> {
    const property: PropertyEntity | null =
      await this.propertyRepository.findOne({ where: { id } });
    if (!property) throw new NotFoundException(`Property #${id} not found`);
    return property;
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<PropertyEntity> {
    const property = await this.findOne(id); // already type-safe
    Object.assign(property, updatePropertyDto);
    return await this.propertyRepository.save(property);
  }

  async remove(id: number): Promise<PropertyEntity> {
    const property = await this.findOne(id);
    await this.propertyRepository.remove(property);
    return property;
  }

  async findVacant(): Promise<PropertyEntity[]> {
    return await this.propertyRepository.find({
      where: { status: PropertyStatus.VACANT },
    });
  }
}
