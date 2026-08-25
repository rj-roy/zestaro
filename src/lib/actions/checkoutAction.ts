import { serverMutation } from "../core/server";
import { Items } from "@/components/pages/Cart/OrderSummary";

type CheckoutData = {
    fullName: string;
    address: string;
    contact: string;
    note?: string;
    userId: string;
    userName: string
    orderedItems: Items[];
};

export const checkoutAction = async (delvMeth: string, checkoutData: CheckoutData) => {
    const itemsId = checkoutData.orderedItems.map(({ itemId }) => ({ itemId }));
    const priceRes = await serverMutation('/api/v1/get/menu/price/cart', itemsId, 'POST');

    if (!priceRes.success) {
        return { success: false, message: priceRes.message };
    };

    if (delvMeth === 'payment') {
        const res = await fetch('/api/checkout_session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: priceRes.data,
            }),
        })
        const data = await res.json();

        if (data.url) {
            window.location.href = data.url;
        } else {
            return {success: false, message: data.message};
        };
    };

    const res = await serverMutation('/api/v1/checkout/create', checkoutData, "POST");
    if (!res.success) {
        return {success: false, message: res.message};
    };

    return res;
};