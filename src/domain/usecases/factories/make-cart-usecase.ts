import { SequelizeCartRepository } from "@/domain/repositories/cart/cart-sequelize-repository";
import { CartUsecases } from "../cart/cart-usecases";
import { SequelizeEbooksRepository } from "@/domain/repositories/ebook/sequelize-ebook-repository";
import { CartItemSequelizeRepository } from "@/domain/repositories/cartItem/cartItem-sequelize-repository";

export function MakeCartUsecase(){ 
    const cartRepository = new SequelizeCartRepository();
    const ebookRepository = new SequelizeEbooksRepository();
    const cartItemsRepository = new CartItemSequelizeRepository()
    const cartUsecas = new CartUsecases(cartRepository, cartItemsRepository, ebookRepository);

    return cartUsecas;
}