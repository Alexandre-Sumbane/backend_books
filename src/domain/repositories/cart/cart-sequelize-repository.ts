import { CartDto } from "@/domain/model/cart";
import { CartRepository } from "./cart-repository";

import sequelizeConnection from "@/infra/database/config/database";

import { Cart } from "@/domain/model/cart";

export class CartSequelizeRepository implements CartRepository{

    constructor(){}

    async addItemsToCart(cartDto: CartDto) {

        const transaction = await sequelizeConnection.transaction();
        
        try {

            const cart = await Cart.create({
                userId: cartDto.userId,
                totalAmount: cartDto.totalAmount
            }, {
                transaction
            });

            await transaction.commit();

            return cart;
            
        } catch (error) {
            console.log("Erro ao criar Cart:", error);
            
            throw error;
        }
    }

    async getUserCart(userId: string, status: string) {

        const cart = await Cart.findOne({
            where: {
                userId,
                status
            }
        })

        if(!cart) {
            return null;
        }

        return cart;
    }
    async removeCart(cartId: string, userId: string){ 
        const cart = await Cart.findOne({
            where: {
                id: cartId,
                userId
            }
        });

        if(!cart) {
            return null;
        }

        await cart.destroy()
    }
        
}