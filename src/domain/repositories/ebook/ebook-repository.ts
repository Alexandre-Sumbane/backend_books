import { EbookDto, EbookResponse } from "../../Dto/Book";


export interface EbookRepository {
  create(ebookData: EbookDto): Promise<EbookResponse>;
  findById(ebookId: string): Promise<EbookResponse | null>;
  findByCode(code: string): Promise<EbookResponse | null>;
  findAll(): Promise<EbookResponse[]>;
  findByCategoryId(categoryId: string): Promise<EbookResponse[]>;
  update(ebookId: string, ebookData: EbookDto): Promise<EbookResponse | null>;
  delete(ebookId: string): Promise<void>;
}