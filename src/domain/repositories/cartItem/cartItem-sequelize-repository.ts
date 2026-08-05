import { CartItem, CartItemDto } from "@/domain/model/cartitem";


export class CartItemSequelizeRepository implements CartItemRepository{ 

    async addItem(item: CartItemDto) {
        const cartItem = await CartItem.create(item);

        return cartItem;
    }
    async updateItem(item: CartItemDto) {

        const cartItemFound = await CartItem.findOne({
            where: {
                bookId: item.bookId,
                cartId: item.cartId
            }
        });

        if(!cartItemFound){
            return null;
        }

        const cartItem = await cartItemFound.update(item);

        return cartItem;
    }
    async removeItem( cartId: string, bookId: string): Promise<void> {
        const cartItem = await CartItem.findOne({
            where: {
                cartId,
                bookId
            }
        });

        await cartItem?.destroy();
    }
}