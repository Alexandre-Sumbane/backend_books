import { HttpExceptionFactory } from "../../../helpers/HttpExceptionFactory";
import models from "../../models";
import { AuthorAttributes } from "../../types/Author";

export class AuthorService {
  constructor(private model: typeof models) {}

  async create(author: AuthorAttributes): Promise<AuthorAttributes> {
    const newAuthor = await models.Author.create(author);

    return newAuthor;
  }

  async findAll(): Promise<AuthorAttributes[]> {
    const authors = await this.model.Author.findAll({
      attributes: ["id", "name", "lastName", "imageUrl"],
      order: [["createdAt", "ASC"]],
    });

    if (authors.length === 0) {
      throw HttpExceptionFactory.notFound("No authors found");
    }

    return authors;
  }

  async findById(id: string): Promise<AuthorAttributes> {
    const author = await models.Author.findByPk(id,
      {
        attributes: ["id", "name", "lastName", "imageUrl"],
        order: [["createdAt", "ASC"]],
        include: [{ model: this.model.Book, as: "books" }],
      }
    );

    if (!author) {
      throw HttpExceptionFactory.notFound("Author not found");
    }

    return author;
  }

  async update(id: string, data: AuthorAttributes): Promise<void> {

    const authorFound = await models.Author.findByPk(id);

    if (!authorFound) {
      throw HttpExceptionFactory.notFound("Author not found");
    }

    await authorFound.update(data);
    
  }

  async delete(id: string): Promise<void> {
    const authorFound = await models.Author.findByPk(id);

    if (!authorFound) {
      throw HttpExceptionFactory.notFound("Author not found");
    }

    await authorFound.destroy();
  }
}
