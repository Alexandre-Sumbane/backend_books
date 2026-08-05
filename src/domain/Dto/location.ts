export interface LocationDto {
  name: string;
  description?: string;
  price: number;
}

export interface LocationResponse {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
