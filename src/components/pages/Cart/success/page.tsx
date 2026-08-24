import Link from 'next/link';
import { CircleCheck, Clock3, HandPlatter, Home, Mail, ReceiptText, Wallet } from 'lucide-react';

interface Props {
    amountPaid?: number | null;
    customerEmail?: string | null;
    paymentStatus?: string | null;
};

const SuccessPageView = ({ amountPaid = null, customerEmail, paymentStatus }: Props) => {
    const isPaid = paymentStatus === 'paid';

    return (
        <div className="min-h-screen bg-wh-p dark:bg-bl-p flex items-center justify-center px-4 sm:px-6 py-12">
            <div className="w-full max-w-lg bg-white dark:bg-neutral/20 rounded-[7px] border border-neutral/10 shadow-sm hover:shadow-xl transition-all duration-300 p-8 sm:p-10 space-y-7 animate-fade-up">
                {/* Success Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                        <div className="relative w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pop-in">
                            <CircleCheck className="w-10 h-10 text-primary" strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-serif font-bold text-secondary dark:text-tertiary">
                        {isPaid ? 'Payment Successful!' : 'Order Confirmed!'}
                    </h1>
                    <p className="text-neutral dark:text-neutral/80 text-xs leading-relaxed max-w-sm mx-auto">
                        {isPaid
                            ? 'Thank you for your order. Your delicious meal is being prepared and will be on its way soon.'
                            : 'Your order has been placed. Please keep the exact amount ready for our delivery partner.'}
                    </p>
                </div>

                {/* Order Details */}
                <div className="rounded-xl bg-wh-p dark:bg-bl-p/60 border border-neutral/10 p-5 space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-neutral flex items-center gap-2">
                            <Wallet className="w-4 h-4" />
                            Payment
                        </span>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${isPaid
                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-primary/10 text-primary'
                                }`}
                        >
                            {isPaid ? 'Paid' : 'Cash on Delivery'}
                        </span>
                    </div>

                    {amountPaid !== null && (
                        <div className="flex justify-between items-center">
                            <span className="text-neutral">Amount Paid</span>
                            <span className="font-semibold text-secondary dark:text-tertiary">
                                ${amountPaid.toFixed(2)}
                            </span>
                        </div>
                    )}

                    {!isPaid && (
                        <div className="flex justify-between items-center">
                            <span className="text-neutral flex items-center gap-2">
                                <Clock3 className="w-4 h-4" />
                                Payable on Arrival
                            </span>
                            <span className="font-semibold text-secondary dark:text-tertiary">At Delivery</span>
                        </div>
                    )}

                    {customerEmail && (
                        <div className="flex justify-between items-center">
                            <span className="text-neutral flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Receipt Sent To
                            </span>
                            <span className="font-medium text-secondary dark:text-tertiary truncate max-w-[55%]">
                                {customerEmail}
                            </span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-1">
                    <Link
                        href="/menu"
                        className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-tertiary px-6 py-4 rounded-xl font-bold transition-all hover:shadow-lg active:scale-95"
                    >
                        <HandPlatter className="w-5 h-5" />
                        Back to Menu
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessPageView;