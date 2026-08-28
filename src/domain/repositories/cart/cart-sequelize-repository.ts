import { CartRepository } from "./cart-repository";

import sequelizeConnection from "@/infra/database/config/database";

import { Cart } from "@/domain/model/cart";
import { CartDto, CartResponse, GetCartProps, UpdateCartDto } from "@/domain/Dto/Cart";
import { CartItem } from "@/domain/model/cartitem";

export class SequelizeCartRepository implements CartRepository {
  constructor() {}

  async create(cartDto: CartDto) {
    const transaction = await sequelizeConnection.transaction();

    try {
      const cart = await Cart.create(
        {
          userId: cartDto.userId,
          totalAmount: cartDto.totalAmount,
        },
        {
          include: [
            {
              model: CartItem,
              as: "cartItems",
            },
          ],
          transaction,
        },
      );

      await transaction.commit();

      return cart as CartResponse;
    } catch (error) {
      console.log("Erro ao criar Cart:", error);

      throw error;
    }
  }

  async updateCart(data: UpdateCartDto, cartId: string, userId: string): Promise<CartResponse> {
    const transaction = await sequelizeConnection.transaction();

    try {
      await Cart.update(
        {
          ...data,
        },
        {
          where: {
            id: cartId,
            userId,
          },
          transaction,
        },
      );

      const cart = await Cart.findByPk(cartId, {
        include: [
          {
            model: CartItem,
            as: "cartItems",
          },
        ],
        transaction,
      });

      await transaction.commit();

      return cart as CartResponse;
    } catch (error) {
      await transaction.rollback();

      console.log("Erro ao actualizar Cart:", error);

      throw error;
    }
  }

  async getUserCart({cartId, userId, status}: GetCartProps) {
    const cart = await Cart.findOne({
      where: {
        userId,
        ...(cartId && { id: cartId }),
        ...(status && { status: status }),
      },
      include: [
        {
          model: CartItem,
          as: "cartItems",
        },
      ],
    });

    if (!cart) {
      return null;
    }

    return cart;
  }
  async removeCart(cartId: string, userId: string) {
    const cart = await Cart.findOne({
      where: {
        id: cartId,
        userId,
      },
    });

    if (!cart) {
      return null;
    }

    await cart.destroy();
  }

  async cleanCart(cartId: string, userId: string) {
    const cart = await Cart.findOne({
      where: {
        id: cartId,
        userId,
      },
    });

    if (!cart) {
      return null;
    }

    await cart.destroy();
  }
}
