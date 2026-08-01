'use client';
import { getDataByQueryParams } from '@/lib/api/getData';
import { authClient } from '@/lib/auth-client';
import { CartCountData, CartItemType } from '@/types/MenuPage';
import { MinusIcon, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useEffect, useState } from "react";

interface CartItemsData {
  cartItems: CartItemType[];
};

type CartResponse = CartItemsData | CartCountData;

const isCartItemsData = (data: CartResponse | null | undefined): data is CartItemsData =>
  !!data && 'cartItems' in data;

export default function FloatingCart() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartData, setCartData] = useState<CartItemType[]>([]);
  const [cartCount, setCartCount] = useState<CartCountData>({ cartLength: 0, totalPrice: 0 });
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!session?.user.id) return;
    const controller = new AbortController();

    getDataByQueryParams<CartResponse>(`/api/v1/cart/get/items?mode=${isOpen ? "items" : "count"}&userId=${session.user.id}`, controller.signal)
      .then(({ data }) => {
        if (isCartItemsData(data)) {
          setCartData(data.cartItems ?? [])
        } else if (data) {
          setCartCount({
            cartLength: data.cartLength,
            totalPrice: data.totalPrice,
          })
        }
      })
      .catch(() => { });
    return () => controller.abort();

  }, [isOpen, session?.user.id])

  console.log(cartData);

  // const totalPrice = cartData.reduce((total, item) => {
  //   return total + (item?.itemPrice ?? 0)
  // }, 0)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-secondary dark:bg-tertiary hover:bg-primary/90 text-tertiary dark:text-secondary px-6 py-4 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95"
      >
        <div className="relative">
          <ShoppingBag />
          <span className="absolute -top-2 -right-2 w-5 h-5 border border-primary bg-secondary dark:bg-tertiary text-tertiary dark:text-secondary text-xs font-bold rounded-full flex items-center justify-center">
            {cartData?.length}
          </span>
        </div>
        <div className="text-left">
          <p className="text-lg font-bold">$</p>
        </div>
      </button>

      {/* Cart Drawer (Conditionally Rendered) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
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
                <X />
              </button>
            </div>

            {/* Cart Items */}
            {
              cartData.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex-1 overflow-y-auto p-6 space-y-4">
                  {/* Item 1 */}
                  <div className="flex gap-4 bg-white dark:bg-neutral/20 p-4 rounded-xl">
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary dark:text-tertiary">
                        {item.itemName}
                      </h4>
                      <p className="text-primary font-bold">${item.itemPrice ?? 1}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button className="p-1 hover:text-primary transition-colors">
                          <MinusIcon />
                        </button>
                        <span className="font-semibold w-6 text-center">{item.quantity ?? 1}</span>
                        <button className="p-1 hover:text-primary transition-colors">
                          <Plus />
                        </button>
                        <button className="ml-auto p-1 text-red-500 hover:text-red-600">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }

            {/* Footer */}
            <div className="border-t border-neutral/20 p-6 space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="text-neutral">Subtotal</span>
                <span className="font-bold text-secondary dark:text-tertiary">
                  $45.00
                </span>
              </div>
              <a
                href="/checkout"
                className="block w-full bg-primary hover:bg-primary/90 text-tertiary text-center py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg"
              >
                Checkout
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}