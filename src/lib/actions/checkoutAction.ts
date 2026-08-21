import { serverMutation } from "../core/server";

// type Data = {
//     fullName: string;
//     address: string;
//     contact: string;
//     note?: string;
//     userId: string;
//     userName: string
// };

export const checkoutAction = async (data: unknown) => {
    if (!data) return
    const res = await serverMutation('/api/v1/checkout/create', data, "POST");
    return res;
};