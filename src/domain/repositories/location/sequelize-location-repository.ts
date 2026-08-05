import { LocationRepository } from "./location-repository";
import { Location } from "@/domain/model/location";
import { LocationDto } from "@/domain/Dto/location";
import { Op } from "sequelize";

export class SequelizeLocationsRepository implements LocationRepository {
  async create(data: LocationDto) {
    const location = await Location.create(data);
    return location;
  }

  async findByName(name: string) {
    const location = await Location.findOne({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });

    return location;
  }

  async findById(locationId: string) {
    const location = await Location.findOne({
      where: {
        id: locationId,
      },
    });

    return location;
  }

  async findAll() {
    const locations = await Location.findAll();
    return locations;
  }

  async update(locationId: string, locationData: LocationDto) {
    const locationFound = await this.findById(locationId);

    if (!locationFound) {
      return null;
    }

    const location = await locationFound.update(locationData);
    return location;
  }

  async delete(locationId: string) {
    const locationFound = await this.findById(locationId);

    await locationFound?.destroy();
  }
}
