import { EbookDto, EbookResponse } from "../../Dto/Book";
import { EbookStatus } from "../../model/book";

export interface EbookRepository {
  create(ebookData: EbookDto, cover: Express.Multer.File, pdf?: Express.Multer.File): Promise<EbookResponse>;
  findById(ebookId: string): Promise<EbookResponse | null>;
  findByCode(code: string): Promise<EbookResponse | null>;
  findAll(): Promise<EbookResponse[]>;
  findByCategoryId(categoryId: string): Promise<EbookResponse[]>;
  findBySeller(userId: string): Promise<EbookResponse[]>
  update(ebookId: string, ebookData: EbookDto): Promise<EbookResponse | null>;
  updateQuantity(ebookId: string, quantity: number): Promise<EbookResponse | null>;
  confirm(ebookId: string, status: EbookStatus): Promise<EbookResponse | null>;
  delete(ebookId: string): Promise<void>;
}