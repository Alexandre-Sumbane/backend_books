import { CartItemDto } from "@/domain/Dto/CartItem";
import { CartStatus } from "@/domain/model/cart";
import { CartRepository } from "@/domain/repositories/cart/cart-repository";
import { CartItemRepository } from "@/domain/repositories/cartItem/cartItem-repository";
import { EbookRepository } from "@/domain/repositories/ebook/ebook-repository";
import { HttpExceptionFactory } from "helpers/HttpExceptionFactory";

export class CartUsecases {
  constructor(
    private cartRepository: CartRepository,
    private cartItemsRepository: CartItemRepository,
    private ebookRepository: EbookRepository,
  ) {}

  async addItemsToCart(items: CartItemDto[], userId: string) {
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw HttpExceptionFactory.badRequest("Nenhum item foi enviado!");
    }

    const invalidItems = items.filter((item) => !item.bookId);

    if (invalidItems.length > 0) {
      throw HttpExceptionFactory.badRequest("BookId inválido!");
    }

    const invalidQuantities = items.filter(
      (item) => !item.quantity || item.quantity <= 0,
    );

    if (invalidQuantities.length > 0) {
      throw HttpExceptionFactory.badRequest(
        "A quantidade deve ser maior que zero!",
      );
    }

    let cart = await this.cartRepository.getUserCart({ 
      userId: userId,
      status: CartStatus.pending 
    });

    if (!cart) {
      cart = await this.cartRepository.create({
        userId,
        totalAmount: 0,
      });

      cart.cartItems = [];
    }
    
    let totalAmount = Number(cart.totalAmount ?? 0);

    for (const item of items) {
      const book = await this.ebookRepository.findById(item.bookId);

      if (!book) {
        throw HttpExceptionFactory.notFound(`Ebook não encontrado!`);
      }

      const existingItem = cart.cartItems?.find(
        (cartItem) => cartItem.bookId === item.bookId,
      );

      const currentQuantity = existingItem?.quantity ?? 0;
      const newQuantity = currentQuantity + item.quantity;

      if ((book.quantity ?? 0) < newQuantity) {
        throw HttpExceptionFactory.conflict("Quantidade insuficiente!");
      }

      const realPrice = Number(book.price);

      if (existingItem) {
        await this.cartItemsRepository.updateItem({
          quantity: newQuantity,
          cartId: cart.id,
          bookId: item.bookId,
        });
      } else {
        await this.cartItemsRepository.addItem({
          cartId: cart.id,
          bookId: item.bookId,
          price: realPrice,
          quantity: item.quantity,
        });
      }

      totalAmount += realPrice * item.quantity;
    }

    cart = await this.cartRepository.updateCart(
      {totalAmount: totalAmount},
      cart.id, userId
    );

    return cart;
  }

  async getCart(userId: string) {
    const cart = await this.cartRepository.getUserCart({ userId: userId });

    if (!cart) {
      throw HttpExceptionFactory.notFound("Carrinho nao encontrado");
    }

    return cart;
  }
}
