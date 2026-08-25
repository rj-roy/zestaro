import { stripe } from '../../../lib/stripe'
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { price } = await request.json();

        const headerList = await headers();
        const origin = headerList.get('origin');



        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: Math.round(Number(price)),
                        product_data: {
                            name: 'All are added',
                        },
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                orderId: "orderId",
            },
            success_url: `${origin}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
        });

        if (!session.url) {
            return NextResponse.json({
                success: false,
                message: "Failed to checkout! Please try again later",
            });
        };

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error("STRIPE ERROR:", error);
        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 }
        );
    }
}