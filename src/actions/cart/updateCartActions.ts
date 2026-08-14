import { serverMutation } from "@/lib/core/server";

export const increaseItemQantity = async (itemId?: string) => {
    console.log('count ++');
    return true;
};

export const decreaseItemQuantity = async (itemId?: string) => {
    return true
};

export const serverUpdateQuantity = async (userId: string, itemId: string, updatedQuantity: number) => {
    if (!userId || !itemId || !updatedQuantity) return;

    const data = { userId, itemId, updatedQuantity };
    const res = await serverMutation('/api/v1/cart/update/item/quantity', data, "PATCH");

    return res;
};