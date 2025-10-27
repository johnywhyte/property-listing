import { PropertyStatus } from "../entities/property.entity";

export class CreatePropertyDto {
  name: string;
  address: string;
  ownerName: string;
  monthlyRent: number;
  status?: PropertyStatus;
}
