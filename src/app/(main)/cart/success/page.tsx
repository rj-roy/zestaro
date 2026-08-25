import SuccessPageView from '@/components/pages/Cart/success/page';
import { stripe } from '@/lib/stripe';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: { default: 'Order Success', template: '%s | Zestaro' },
    description: 'Your order has been placed successfully',
};

interface Props {
    searchParams: Promise<{ session_id?: string }>;
}

const CartSuccessPage = async ({ searchParams }: Props) => {
    const { session_id: sessionId } = await searchParams;

    let amountPaid: number | null = null;
    let customerEmail: string | null = null;
    let paymentStatus: string | null = null;

    if (sessionId) {
        try {
            const session = await stripe.checkout.sessions.retrieve(sessionId);

            if (session.status === 'complete') {
                amountPaid = session.amount_total
                customerEmail = session.customer_details?.email ?? null;
                paymentStatus = session.payment_status;
            };
        } catch (error) {
            console.error("STRIPE SESSION RETRIEVE ERROR:", error);
        };
    };

    return (
        <SuccessPageView
            amountPaid={amountPaid}
            customerEmail={customerEmail}
            paymentStatus={paymentStatus}
        />
    );
};

export default CartSuccessPage;