import { LocationDto, LocationResponse } from "../../Dto/location";

export interface LocationRepository {
  create(locationData: LocationDto): Promise<LocationResponse>;
  findByName(name: string): Promise<LocationResponse | null>;
  findById(locationId: string): Promise<LocationResponse | null>;
  findAll(): Promise<LocationResponse[]>;
  update(locationId: string, locationData: LocationDto): Promise<LocationResponse | null>;
  delete(locationId: string): Promise<void>;
}
