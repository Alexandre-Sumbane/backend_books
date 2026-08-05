import { SequelizeLocationsRepository } from "@/domain/repositories/location/sequelize-location-repository";
import { LocationUsecases } from "@/domain/usecases/location/location-usecases";

export function MakeLocationUsecase() {
  const locationRepository = new SequelizeLocationsRepository();
  const locationUsecase = new LocationUsecases(locationRepository);

  return locationUsecase;
}
