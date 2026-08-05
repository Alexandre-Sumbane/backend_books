import { HttpExceptionFactory } from "../../../../helpers/HttpExceptionFactory";
import { LocationDto, LocationResponse } from "@/domain/Dto/location";
import { LocationRepository } from "@/domain/repositories/location/location-repository";

export class LocationUsecases {
  constructor(private locationRepository: LocationRepository) {}

  async create(location: LocationDto): Promise<LocationResponse> {
    const locationFound = await this.locationRepository.findByName(location.name);

    if (locationFound) {
      throw HttpExceptionFactory.conflict("O local já existe, tente outro nome!");
    }

    const newLocation = await this.locationRepository.create(location);
    return newLocation;
  }

  async findAll(): Promise<LocationResponse[]> {
    const locations = await this.locationRepository.findAll();

    if (locations.length === 0) {
      throw HttpExceptionFactory.notFound("Nenhum local foi encontrado!");
    }

    return locations;
  }

  async findByName(name: string): Promise<LocationResponse> {
    const location = await this.locationRepository.findByName(name);

    if (!location) {
      throw HttpExceptionFactory.notFound("Local não encontrado!");
    }

    return location;
  }

  async findById(id: string): Promise<LocationResponse> {
    const location = await this.locationRepository.findById(id);

    if (!location) {
      throw HttpExceptionFactory.notFound("Local não encontrado!");
    }

    return location;
  }

  async update(id: string, data: LocationDto): Promise<LocationResponse | null> {
    const locationFound = await this.locationRepository.findById(id);

    if (!locationFound) {
      throw HttpExceptionFactory.notFound("Local não encontrado");
    }

    const location = await this.locationRepository.update(id, data);
    return location;
  }

  async delete(id: string): Promise<void> {
    const locationFound = await this.locationRepository.findById(id);

    if (!locationFound) {
      throw HttpExceptionFactory.notFound("Local não encontrado!");
    }

    await this.locationRepository.delete(id);
  }
}
