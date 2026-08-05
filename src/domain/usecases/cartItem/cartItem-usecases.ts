import { CartItemDto } from "@/domain/Dto/CartItem";
import { CartItemRepository } from "@/domain/repositories/cartItem/cartItem-repository";


export class CartItemUsecases {
    constructor(private cartItemRepository: CartItemRepository){}

    async addItem(item: CartItemDto) {
        return await this.cartItemRepository.addItem(item);
    }
}