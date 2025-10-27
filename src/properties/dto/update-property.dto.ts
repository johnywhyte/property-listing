// import { PartialType } from '@nestjs/mapped-types';
// import { CreatePropertyDto } from './create-property.dto';

// export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {}

export class UpdatePropertyDto {
  name?: string;
  address?: string;
  ownerName?: string;
  monthlyRent?: number;
  status?: "occupied" | "vacant" | "maintenance";
}
