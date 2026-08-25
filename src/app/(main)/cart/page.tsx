import RootCartComp from "@/components/pages/Cart/RootCartComp";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: { default: 'My Cart', template: '%s | Zestaro' },
    description: 'Manage Cart and Checkout',
}
const CartPage = () => {
    return (
        <div>
            <RootCartComp />
        </div>
    )
};

export default CartPage;
