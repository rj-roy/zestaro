import { serverMutation } from "@/lib/core/server";
import { toast } from "react-toastify";

export const removeCartAction = async (userId: string, itemId: string) => {
    if (!userId) {
        toast.error("Please Login again!");
    };

    if (!itemId) {
        toast.error("Item not found!");
    };

    const data = { userId, itemId };

    const res = await serverMutation(`/api/v1/cart/update/remove/item/`, data, "PATCH");
    return res;
};