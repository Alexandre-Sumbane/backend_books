import dbConnection from "../config/database";
import { Author } from "./author";
import { AuthorBook } from "./authorbook";
import { Book } from "./book";
import { Category } from "./category";

const models = { 
  Author,
  Category,
  AuthorBook,
  Book
};

Object.values(models).forEach((model: any) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

export { dbConnection };

export default models;
