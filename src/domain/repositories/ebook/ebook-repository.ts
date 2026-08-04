import { EbookDto, EbookResponse } from "../../Dto/Book";

import { Request } from "express";


export interface EbookRepository {
  create(ebookData: EbookDto, cover: Express.Multer.File, pdf: Express.Multer.File): Promise<EbookResponse>;
  findById(ebookId: string): Promise<EbookResponse | null>;
  findByCode(code: string): Promise<EbookResponse | null>;
  findAll(): Promise<EbookResponse[]>;
  findByCategoryId(categoryId: string): Promise<EbookResponse[]>;
  findBySeller(userId: string): Promise<EbookResponse[]>
  update(ebookId: string, ebookData: EbookDto): Promise<EbookResponse | null>;
  delete(ebookId: string): Promise<void>;
}