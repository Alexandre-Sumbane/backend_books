import {
  UserEbook,
  UserEbookOutput,
  UserEbookStatus,
} from "@/domain/model/userBook";
import { UserBookRepository } from "./userRepository";
import { OrderItemDto } from "@/domain/model/orderitem";

export class SequelizeUserBookRepository implements UserBookRepository {
  async addUserBook(orderItems: OrderItemDto[], userId: string) {

    let userBook;

    for(const orderItem of orderItems){
      const {bookId} = orderItem;
      userBook = await UserEbook.create({
        userId,
        ebookId: bookId,
        status: UserEbookStatus.active,
        purchasedAt: new Date(),
      });
    }

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
