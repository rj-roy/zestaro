import { decreaseItemQuantity, increaseItemQantity } from "@/actions/cart/updateCartActions";
import { LocalCartItem } from "@/types/LocalCartItem";

export const increaseItemQuantityHelper = async (itemId: string, loggedIn: boolean) => {
    if (loggedIn) {
        return await increaseItemQantity(itemId);
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as LocalCartItem[];
    const updated = cart.map(item => item.itemId === itemId ? { ...item, quantity: item.quantity + 1 } : item);
    localStorage.setItem("cart", JSON.stringify(updated));

    return false;
};

export const decreaseItemQuantityHelper = async (itemId?: string, loggedIn?: boolean) => {
    if (loggedIn) {
        return await decreaseItemQuantity(itemId);
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as LocalCartItem[];
    const updated = cart.map(item => item.itemId === itemId ? {...item, quantity: item.quantity - 1} : item);
    localStorage.setItem("cart", JSON.stringify(updated));

    return false;
};
