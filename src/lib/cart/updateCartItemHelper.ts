import { decreaseItemQuantity, increaseItemQantity } from "@/actions/cart/updateCartActions";

export const increaseItemQuantityHelper = async (itemId: string, loggedIn: boolean) => {
    if (loggedIn) {
        return await increaseItemQantity(itemId);
    }
    console.log("localup");
    return false;
};

export const decreaseItemQuantityHelper = async (itemId?: string, loggedIn?: boolean) => {
    if (loggedIn) {
        return await decreaseItemQuantity(itemId);
    }
    console.log(itemId, "decreased");
    return false;
};