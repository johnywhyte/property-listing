import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from "@nestjs/common";
import { PropertiesService } from "./properties.service";
import { CreatePropertyDto } from "./dto/create-property.dto";
import { UpdatePropertyDto } from "./dto/update-property.dto";
import { PropertyEntity } from "./entities/property.entity";
import { ApiTags } from "@nestjs/swagger";
import { PropertyStatus } from "./entities/property.entity";

@ApiTags("Properties")
@Controller("properties")
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  // Create a new property
  @Post()
  async create(
    @Body() createPropertyDto: CreatePropertyDto,
  ): Promise<PropertyEntity> {
    return this.propertiesService.create(createPropertyDto);
  }

  // Get all properties
  // @Get()
  // async findAll(): Promise<PropertyEntity[]> {
  //   return this.propertiesService.findAll();
  // }
  @Get()
  async findAll(
    @Query("status") status?: PropertyStatus,
  ): Promise<PropertyEntity[]> {
    return this.propertiesService.findAll(status);
  }

  // Get all vacant properties
  @Get("vacant")
  async findVacant(): Promise<PropertyEntity[]> {
    return this.propertiesService.findVacant();
  }

  // Get a single property by id
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<PropertyEntity> {
    return this.propertiesService.findOne(+id);
  }

  // Update a property
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<PropertyEntity> {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  // Delete a property
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<PropertyEntity> {
    return this.propertiesService.remove(+id);
  }
}
