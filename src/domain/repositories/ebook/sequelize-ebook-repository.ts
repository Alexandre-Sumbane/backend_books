import { EbookDto, EbookResponse } from "@/domain/Dto/Book";
import { EbookRepository } from "./ebook-repository";

import { Ebook } from "@/domain/model/book";

import { CoverImage } from "@/domain/model/coverImage";
import { EbookFile } from "@/domain/model/bookFile";

import sequelizeConnection from "@/infra/database/config/database";
import { Category } from "@/domain/model/category";

export class SequelizeEbooksRepository implements EbookRepository {
  async create(
    data: EbookDto,
    cover?: Express.Multer.File,
    pdf?: Express.Multer.File,
  ) {
    const transaction = await sequelizeConnection.transaction();

    try {
      const ebook = await Ebook.create(data, {
        transaction,
      });

      if (cover) {
        await CoverImage.create(
          {
            ebookId: ebook.id,
            fileName: cover.filename,
            originalName: cover.originalname,
          },
          {
            transaction,
          },
        );
      }

      if (pdf) {
        await EbookFile.create(
          {
            ebookId: ebook.id,
            fileName: pdf.filename,
            originalName: pdf.originalname,
          },
          {
            transaction,
          },
        );
      }

      await transaction.commit();

      return ebook;
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }

  async findById(ebookId: string) {
    const ebook = await Ebook.findOne({
      where: {
        id: ebookId,
      },
    });

    return ebook;
  }

  async findByCategoryId(categoryId: string) {
    const ebooks = await Ebook.findAll({
      where: {
        categoryId,
      },
      include: [
        {
          model: CoverImage,
          required: true,
        },
        {
          model: EbookFile,
          required: true,
        },
      ],
    });

    return ebooks;
  }

  async findByCode(code: string) {
    const ebook = await Ebook.findOne({
      where: {
        code,
      },
      include: [
        {
          model: CoverImage,
          as: "cover",
        },
        {
          model: EbookFile,
          as: "ebookDoc",
        },
      ],
    });

    return ebook;
  }

  async findBySeller(userId: string) {
    const books = await Ebook.findAll({
      where: {
        userId,
      },
      include: [
           {
            model: Category,
            as: "category",
           }, 
          {
            model: CoverImage,
            as: "cover",
          },
          {
            model: EbookFile,
            as: "ebookDoc",
          }
      ]
    });

    return books;
  }

  async findAll(): Promise<EbookResponse[]> {
    const ebooks = await Ebook.findAll({
      include: [
        {
            model: Category,
            as: "category",
        },
        {
          model: CoverImage,
          as: "cover",
        },
        {
          model: EbookFile,
          as: "ebookDoc",
        },
      ],
    });

    return ebooks;
  }

  async update(ebookId: string, ebookData: EbookDto) {
    const ebookFound = await this.findById(ebookId);

    if (!ebookFound) {
      return null;
    }

    const ebook = await ebookFound.update(ebookData);

    return ebook;
  }

  async delete(ebookId: string) {
    const ebookFound = await this.findById(ebookId);

    await ebookFound?.destroy();
  }
}
