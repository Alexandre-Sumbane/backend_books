import { EbookRepository } from "@/domain/repositories/ebook/ebook-repository";
import { HttpExceptionFactory } from "../../../../helpers/HttpExceptionFactory";
import { EbookDto, EbookResponse } from "@/domain/Dto/Book";

import { Request } from "express";

export class EBookUsecases {
  constructor(private ebookRepository: EbookRepository) {}
  async create(book: EbookDto, req: Request): Promise<EbookResponse> {
    const files = req.files as {
      cover?: Express.Multer.File[];
      file?: Express.Multer.File[];
    };

    const cover = files.cover?.[0];
    const pdf = files.file?.[0];

    if (!cover || !pdf) {
      throw HttpExceptionFactory.badRequest("Nenhum ficheiro foi enviado!");
    }

    const bookFound = await this.ebookRepository.findByCode(book.code);

    if (bookFound) {
      throw HttpExceptionFactory.conflict(
        "O livro já existe, tente outro código!",
      );
    }

    const newBook = await this.ebookRepository.create(book, cover, pdf);

    return newBook;
  }

  async findAll(): Promise<EbookResponse[]> {
    const books = await this.ebookRepository.findAll();

    if (books.length === 0) {
      throw HttpExceptionFactory.notFound("Nenhum livro foi encontrado!");
    }

    return books;
  }

  async findById(id: string): Promise<EbookResponse> {
    const book = await this.ebookRepository.findById(id);

    if (!book) {
      throw HttpExceptionFactory.notFound("Livro não encontrado!");
    }

    return book;
  }

  async findByCategoryId(categoryId: string): Promise<EbookResponse[]> {
    const book = await this.ebookRepository.findByCategoryId(categoryId);

    if (!book) {
      throw HttpExceptionFactory.notFound(
        "Livro nao encontrado para a categoria informada!",
      );
    }

    return book;
  }

  async update(id: string, data: EbookDto): Promise<EbookResponse | null> {
    const bookFound = await this.ebookRepository.findById(id);

    if (!bookFound) {
      throw HttpExceptionFactory.notFound("Book not found");
    }

    const book = await this.ebookRepository.update(id, data);

    return book;
  }

  async delete(id: string): Promise<void> {
    const bookFound = await this.ebookRepository.findById(id);

    if (!bookFound) {
      throw HttpExceptionFactory.notFound("Livro nao encontrado!");
    }

    await this.ebookRepository.delete(id);
  }
}
