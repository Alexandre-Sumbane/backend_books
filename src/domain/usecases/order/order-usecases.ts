import { EbookResponse } from "@/domain/Dto/Book";
import { CreateOrderDto } from "@/domain/Dto/order";
import { CartRepository } from "@/domain/repositories/cart/cart-repository";
import { EbookRepository } from "@/domain/repositories/ebook/ebook-repository";
import { OrderRepository } from "@/domain/repositories/order/order-repository";
import { HttpExceptionFactory } from "helpers/HttpExceptionFactory";

export class OrderUsecases {
  constructor(
    private ebookRepository: EbookRepository,
    private cartRepository: CartRepository,
    private orderRepository: OrderRepository,
  ) {}

  async create(orderDto: CreateOrderDto, userId: string) {
    const { items, shippingAddress } = orderDto;

    const books = new Map<string, EbookResponse>();

    for (const item of items) {
      const book = await this.ebookRepository.findById(item.bookId);

      if (!book) {
        throw HttpExceptionFactory.notFound(`Ebook não encontrado!`);
      }

      if ((book.quantity ?? 0) < item.quantity) {
        throw HttpExceptionFactory.conflict("Quantidade insuficiente!");
      }
      books.set(item.bookId, book);
    }

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const latestCart = await this.cartRepository.getUserCart(userId, "pending");

    if (!latestCart) {
      throw HttpExceptionFactory.notFound("Carrinho nao encontrado!");
    }

    const orderNumber = Math.floor(Math.random() * 1000000).toString();

    const order = await this.orderRepository.create({
      userId,
      totalAmount: total,
      shippingAddress,
      cartId: latestCart.id,
      orderNumber,
      orderItems: items.map((item) => ({
        orderId: order.id,
        bookId: item.bookId,
        quantity: item.quantity,
        price: item.price,
      })),
    });

    for (const item of items) {
      const book = books.get(item.bookId)!;

      await this.ebookRepository.updateQuantity(
        book.id,
        book.quantity! - item.quantity,
      );
    }

    return order;
  }
}
