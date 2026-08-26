import { EbookFormat, EbookType } from "../model/book";

enum EbookStatus {
  pendent,
  published,
  blocked,
}

export interface EbookDto {
  title: string;
  type?: EbookType;
  code: string;
  language: string;
  author: string;
  sinopse?: string;
  description?: string;
  price: number;
  quantity?: number;
  categoryId: string;
  format: EbookFormat;
  pages?: number;
  sellerId?: string;
}

export interface EbookResponse {
  id: string;
  type?: EbookType;
  code: string;
  title: string;
  author: string;
  language: string;
  sinopse?: string;
  description?: string;
  price: number;
  quantity?: number;
  rating?: number;
  totalReviews?: number;
  categoryId: string;
  format: EbookFormat;
  pages?: number;
  publishDate?: Date;
  statePublisher?: EbookStatus;
  sellerId?: string;
}
