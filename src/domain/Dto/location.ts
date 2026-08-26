export interface LocationDto {
  name: string;
  description?: string;
  price: number;
  estimatedTime?: number;
}

export interface LocationResponse {
  id: string;
  name: string;
  description?: string;
  price: number;
  estimatedTime?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
