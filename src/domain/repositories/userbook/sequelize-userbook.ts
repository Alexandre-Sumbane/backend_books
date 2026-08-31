import {
  UserEbook,
  UserEbookOutput,
  UserEbookStatus,
} from "@/domain/model/userBook";
import { UserBookRepository } from "./userRepository";
import { OrderItemDto } from "@/domain/model/orderitem";
import { UserEbookResponses } from "@/domain/Dto/user-ebook";
import { Ebook } from "@/domain/model/book";

export class SequelizeUserBookRepository implements UserBookRepository {
  //  async addUserBook(
  //   orderItems: OrderItemDto[],
  //   userId: string
  // ): Promise<UserEbookResponses[]> {
  //   const ebookIds = orderItems.map((item) => item.bookId);

  //   await UserEbook.bulkCreate(
  //     ebookIds.map((ebookId) => ({
  //       userId,
  //       ebookId,
  //       status: UserEbookStatus.active,
  //       purchasedAt: new Date(),
  //       quantity
  //     }))
  //   );

  //   const userBooks = await UserEbook.findAll({
  //     where: {
  //       userId,
  //       ebookId: ebookIds,
  //     },
  //     include: [
  //       {
  //         model: Ebook,
  //         as: "book",
  //       },
  //     ],
  //   });

  //   return userBooks.map(
  //     (userBook) => userBook.toJSON() as UserEbookResponses
  //   );
  // }

  async addUserBook(
    orderItems: OrderItemDto[],
    userId: string,
  ): Promise<UserEbookResponses[]> {
    await UserEbook.bulkCreate(
      orderItems.map((item) => ({
        userId,
        ebookId: item.bookId,
        status: UserEbookStatus.active,
        purchasedAt: new Date(),
        quantity: item.quantity,
      })),
    );

    const ebookIds = orderItems.map((item) => item.bookId);

    const userBooks = await UserEbook.findAll({
      where: {
        userId,
        ebookId: ebookIds,
      },
      include: [
        {
          model: Ebook,
          as: "book",
        },
      ],
    });

    return userBooks.map((userBook) => userBook.toJSON() as UserEbookResponses);
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
