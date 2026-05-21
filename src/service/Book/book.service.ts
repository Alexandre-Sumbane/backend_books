import { HttpExceptionFactory } from "../../../helpers/HttpExceptionFactory";
import models from "../../models";
import { BookAttributes } from "../../types/Book";

export class BookService {
  constructor(private model: typeof models) {}

  async create(book: BookAttributes): Promise<BookAttributes> {
    book.publishDate = new Date();

    const bookFound = await models.Book.findOne({
      where: {
        code: book.code,
      },
    });

    if (bookFound) {
      throw HttpExceptionFactory.conflict("Book with this code already exists");
    }
  
    const newBook = await models.Book.create(book);

    await this.model.AuthorBook.create({
      authorId: book.authorId!,
      bookId: newBook.id,
    });

    return newBook;
  }

  async findAll(): Promise<BookAttributes[]> {

    const books = await this.model.Book.findAll({
      order: [["createdAt", "ASC"]],
    });

    if (books.length === 0) {
      throw HttpExceptionFactory.notFound("No Books found");
    }

    return books;
  }

  async findById(id: string): Promise<BookAttributes> {
    const book = await models.Book.findByPk(id, {
      order: [["createdAt", "ASC"]],
      include: [
        { model: this.model.Category, as: "category" },
        {
          model: this.model.Author,
          as: "authors",
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!book) {
      throw HttpExceptionFactory.notFound("Book not found");
    }

    return book;
  }

  async update(id: string, data: BookAttributes): Promise<void> {
    const bookFound = await models.Book.findByPk(id);

    if (!bookFound) {
      throw HttpExceptionFactory.notFound("Book not found");
    }

    await bookFound.update(data);
  }

  async delete(id: string): Promise<void> {
    const bookFound = await models.Book.findByPk(id);

    if (!bookFound) {
      throw HttpExceptionFactory.notFound("Book not found");
    }

    await bookFound.destroy();
  }
}
