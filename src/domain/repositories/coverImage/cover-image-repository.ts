

export interface CoverImageRepository {
  create(coverImageData: { ebookId: string; fileName: string, originalName: string }): Promise<void>;
  findByEbookId(ebookId: string): Promise<{ ebookId: string; coverImagePath: string } | null>;
  deleteByEbookId(ebookId: string): Promise<void>;
}