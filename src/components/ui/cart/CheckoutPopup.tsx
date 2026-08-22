"use client";
import { Items } from "@/components/pages/Cart/OrderSummary";
import { checkoutAction } from "@/lib/actions/checkoutAction";
import { useSession } from "@/lib/auth-client";
import { ShoppingBag, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface Props {
    delvMeth: string;
    items: Items[];
};

export default function CheckoutPopup({ delvMeth, items }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { fullName, address, contact, note } = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
        if (!fullName || !address || !contact) {
            toast.error("Please fill the form correctly!");
        };

        if (items.length <= 0) {
            return toast.error("Empty Cart!");
        };

        if (!session?.user) {
            toast.error("Please Login to checkout! Rediredting...")
            setTimeout(() => {
                router.push('/auth?login=true')
            }, 5000);
            return;
        } else {
            const checkoutData = { fullName, address, contact, note, orderedItems: items, userId: session?.user.id, userName: session?.user.name };
            const checkoutRes = await checkoutAction(delvMeth, checkoutData);

            if (!checkoutRes.success) {
                toast.error(checkoutRes.message || "Failed to checkout! please try again");
                setTimeout(() => {
                    return window.location.reload()
                }, 3000);
            };

            toast.success(checkoutRes.message);
            setTimeout(() => {
                    return window.location.reload()
                }, 3000);
        };
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-tertiary px-4 py-4 rounded-xs font-bold transition-all hover:shadow-lg active:scale-95"
            >
                <ShoppingBag className="w-5 h-5" />
                {
                    delvMeth === "payment" ? 'Pay and Proceed' : 'Order With Cash'
                }
            </button>

            {/* Checkout Popup Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-lg bg-tertiary dark:bg-secondary rounded-xs shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-neutral/20">
                            <h2 className="text-2xl font-serif font-bold text-secondary dark:text-tertiary">
                                Checkout Details
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-neutral/10 rounded-xl transition-colors"
                                aria-label="Close checkout"
                            >
                                <X />
                            </button>
                        </div>

                        {/* Form */}
                        <form className="p-6 space-y-3" onSubmit={onSubmit}>
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="fullName"
                                    className="block text-sm font-semibold text-secondary dark:text-tertiary"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="John Doe"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral/20 border border-neutral/20 dark:border-neutral/30 text-secondary dark:text-tertiary placeholder:text-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Delivery Address */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="address"
                                    className="block text-sm font-semibold text-secondary dark:text-tertiary"
                                >
                                    Delivery Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    placeholder="Street, City, State, ZIP Code"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral/20 border border-neutral/20 dark:border-neutral/30 text-secondary dark:text-tertiary placeholder:text-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                />
                            </div>

                            {/* Email or Phone */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="contact"
                                    className="block text-sm font-semibold text-secondary dark:text-tertiary"
                                >
                                    Email or Phone Number
                                </label>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    placeholder="john@example.com or +1 234 567 890"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral/20 border border-neutral/20 dark:border-neutral/30 text-secondary dark:text-tertiary placeholder:text-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="note"
                                    className="block text-sm font-semibold text-secondary dark:text-tertiary"
                                >
                                    Order Note
                                </label>
                                <textarea
                                    id="note"
                                    name="note"
                                    rows={3}
                                    placeholder="Any extra info....?"
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral/20 border border-neutral/20 dark:border-neutral/30 text-secondary dark:text-tertiary placeholder:text-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                />
                            </div>

                            {/* Order Summary Snippet (Optional but good UX) */}
                            <div className="pt-4 border-t border-neutral/20">
                                <button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90 text-tertiary font-bold text-lg py-4 rounded-xs shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                                >

                                    Place Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}