'use client';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  itemCount: number;
}

const DELIVERY_FEE = 4.99;
const TAX_RATE = 0.08;

export default function OrderSummary({ subtotal, itemCount }: OrderSummaryProps) {
  const delivery = subtotal > 0 ? DELIVERY_FEE : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + delivery + tax;

  return (
    <div className="bg-white dark:bg-neutral/20 rounded-2xl border border-neutral/10 shadow-sm hover:shadow-xl transition-all duration-300 p-6 space-y-5 h-fit lg:sticky lg:top-28">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-secondary dark:text-tertiary">
          Order Summary
        </h2>
        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-neutral">Subtotal</span>
          <span className="font-semibold text-secondary dark:text-tertiary">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral">Delivery Fee</span>
          <span className="font-semibold text-secondary dark:text-tertiary">
            {delivery === 0 ? 'Free' : `$${delivery.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral">Tax (8%)</span>
          <span className="font-semibold text-secondary dark:text-tertiary">
            ${tax.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="border-t border-neutral/20 pt-4 flex justify-between items-center">
        <span className="text-neutral text-lg">Total</span>
        <span className="text-2xl font-bold text-secondary dark:text-tertiary">
          ${total.toFixed(2)}
        </span>
      </div>

      <Link
        href="/checkout"
        className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-tertiary px-4 py-4 rounded-xl font-bold transition-all hover:shadow-lg active:scale-95"
      >
        <ShoppingBag className="w-5 h-5" />
        Proceed to Checkout
      </Link>

      <Link
        href="/menu"
        className="flex items-center justify-center gap-2 w-full text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Continue Shopping
      </Link>
    </div>
  );
}
