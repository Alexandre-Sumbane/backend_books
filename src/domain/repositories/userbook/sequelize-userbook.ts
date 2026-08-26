import {
  UserEbook,
  UserEbookInput,
  UserEbookOutput,
} from "@/domain/model/userBook";
import { UserBookRepository } from "./userRepository";

export class SequelizeUserBookRepository implements UserBookRepository {
  async addUserBook(input: UserEbookInput) {
    const { userId, ebookId } = input;

    const userBook = await UserEbook.create({
      userId,
      ebookId,
      purchasedAt: new Date(),
    });

    return userBook as UserEbookOutput;
  }

  async getUserBooks(userId: string) {
    const userBooks = await UserEbook.findAll({
      where: {
        userId,
      },
    });

    return userBooks as UserEbookOutput[];
  }
  async getUserBookById(userId: string, bookId: string) {
    const userBook = await UserEbook.findOne({
      where: {
        userId,
        ebookId: bookId,
      },
    });

    return userBook as UserEbookOutput;
  }
}
