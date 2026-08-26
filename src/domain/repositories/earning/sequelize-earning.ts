import { UserEbook } from "@/domain/model/userBook";
import { EarningRepository } from "./earning-repositories";
import { Ebook } from "@/domain/model/book";
import { Category } from "@/domain/model/category";
import axios from "axios";
import { Transaction } from "@/domain/model/transaction";
import { fn, literal } from "sequelize";

type UserEbookWithBook = UserEbook & {
  book: Ebook;
};

type SellerSituation = {
  totalEarnings: number | string;
  totalWithdrawal: number | string;
};

export class SequelizeEarningRepository implements EarningRepository {
  async getSellerEarnings(sellerId: string): Promise<{ total: number }> {
    const bookusers = (await UserEbook.findAll({
      where: { status: "active" },
      include: [
        {
          model: Ebook,
          as: "book",
          attributes: ["id", "title", "code", "price", "language", "author"],
          required: true,
          where: { sellerId },
          include: [
            {
              model: Category,
              as: "category",
              attributes: ["id", "name"],
              required: true,
            },
          ],
        },
      ],
    })) as UserEbookWithBook[];

    const total = bookusers.reduce(
      (acc, userBook) => acc + Number(userBook.book.price),
      0,
    );

    return { total };
  }

  async getTotalEarningsComplete(sellerId: string, token: string) {
    const userEbooks = (await UserEbook.findAll({
      where: {
        status: "active",
      },
      include: [
        {
          model: Ebook,
          as: "book",
          attributes: ["id", "title", "code", "price", "language", "author"],
          required: true,
          where: {
            sellerId,
          },
          include: [
            {
              model: Category,
              as: "category",
              attributes: ["id", "name"],
              required: true,
            },
          ],
        },
      ],
    })) as UserEbookWithBook[];

    const userIds = [...new Set(userEbooks.map((item) => item.userId))];

    const { data } = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/auth/users/batch`,
      { ids: userIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const usersMap = new Map(data.users.map((user: any) => [user.id, user]));

    const report = userEbooks.map((item) => {
      const json = item.toJSON();

      return {
        userEbookId: json.id,
        ebook: json.book,
        user: usersMap.get(json.userId) || null,
      };
    });

    const summary: Record<string, any> = {};

    report.forEach((item) => {
      if (!item.ebook) return;

      const ebookId = item.ebook.id;

      if (!summary[ebookId]) {
        summary[ebookId] = {
          ebook: item.ebook,
          totalValue: 0,
          totalSales: 0,
          buyers: [],
        };
      }

      // Converter para número caso DECIMAL venha como string
      const price = Number(item.ebook.price);

      summary[ebookId].totalValue += price;
      summary[ebookId].totalSales += 1;

      summary[ebookId].buyers.push({
        user: item.user,
        bookPrice: price,
        code: item.ebook.code,
      });
    });

    return summary;
  }

  static async getOrganizerSituation(sellerId: string) {
    const result = (await Transaction.findOne({
      attributes: [
        [
          fn(
            "COALESCE",
            fn(
              "SUM",
              literal("CASE WHEN type = 'sale' THEN amount ELSE 0 END"),
            ),
            0,
          ),
          "totalEarnings",
        ],
        [
          fn(
            "COALESCE",
            fn(
              "SUM",
              literal("CASE WHEN type = 'withdrawal' THEN amount ELSE 0 END"),
            ),
            0,
          ),
          "totalWithdrawal",
        ],
      ],
      where: { sellerId },
      raw: true,
    })) as SellerSituation | null;

    const totalEarnings = Number(result?.totalEarnings ?? 0);
    const totalWithdrawal = Number(result?.totalWithdrawal ?? 0);

    const balance = totalEarnings + totalWithdrawal;

    return {
      totalEarnings,
      totalWithdrawal,
      balance,
    };
  }
}
