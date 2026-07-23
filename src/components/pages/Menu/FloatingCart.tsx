'use client';

import { useState } from 'react';
import { ShoppingBag, X, Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { CartItemType } from '@/types/MenuPage';

interface FloatingCartProps {
  items: CartItemType[];
  total: number;
  count: number;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export default function FloatingCart({ items, total, count, onUpdateQuantity }: FloatingCartProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-primary hover:bg-primary/90 text-tertiary px-6 py-4 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95"
      >
        <div className="relative">
          <ShoppingBag className="w-6 h-6" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-secondary dark:bg-tertiary text-tertiary dark:text-secondary text-xs font-bold rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </div>
        <div className="text-left">
          <p className="text-xs opacity-90">{count} items</p>
          <p className="text-lg font-bold">${total.toFixed(2)}</p>
        </div>
      </button>

      {/* Cart Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <div className="relative w-full max-w-md bg-tertiary dark:bg-secondary h-full shadow-2xl flex flex-col animate-slide-in-right">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral/20">
              <h2 className="text-2xl font-serif font-bold text-secondary dark:text-tertiary">
                Your Cart
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-neutral/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-secondary dark:text-tertiary" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 mx-auto text-neutral/40 mb-4" />
                  <p className="text-neutral">Your cart is empty</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 text-primary font-semibold hover:underline"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-white dark:bg-neutral/20 p-4 rounded-xl"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary dark:text-tertiary">
                        {item.name}
                      </h4>
                      <p className="text-primary font-bold">${item.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onUpdateQuantity(item.id, -item.quantity)}
                          className="ml-auto p-1 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-neutral/20 p-6 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-neutral">Subtotal</span>
                  <span className="font-bold text-secondary dark:text-tertiary">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-primary hover:bg-primary/90 text-tertiary text-center py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
