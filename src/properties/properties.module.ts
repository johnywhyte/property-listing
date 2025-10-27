import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PropertiesService } from "./properties.service";
import { PropertiesController } from "./properties.controller";
import { PropertyEntity } from "./entities/property.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PropertyEntity])],
  providers: [PropertiesService],
  controllers: [PropertiesController],
})
export class PropertiesModule {}
