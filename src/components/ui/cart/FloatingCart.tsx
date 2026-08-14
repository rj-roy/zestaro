'use client';
import { useCart } from '@/components/providers/CartProvider';
import { getDataByQueryParams } from '@/lib/api/getData';
import { authClient } from '@/lib/auth-client';
import { decreaseItemQuantityHelper, increaseItemQuantityHelper } from '@/lib/cart/updateCartItemHelper';
import { serverMutation } from '@/lib/core/server';
import { LocalCartItem } from '@/types/LocalCartItem';
import { CartCountData, CartItemType } from '@/types/MenuPage';
import { MinusIcon, PaperBag, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { startTransition, useEffect, useOptimistic, useState } from "react";

interface CartItemsData {
  cartItems: CartItemType[];
};

interface PropsType {
  forNav: boolean;
};

type CartResponse = CartItemsData | CartCountData;

const isCartItemsData = (data: CartResponse | null | undefined): data is CartItemsData =>
  !!data && 'cartItems' in data;

export default function FloatingCart({ forNav }: PropsType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session } = authClient.useSession();
  const id = session?.user.id;
  const name = session?.user.name;
  // const [cartData, setCartData] = useState<CartItemType[]>([]);
  // const [localCart, setLocalCart] = useState<CartItemType[]>([]);
  // const [cartCounts, setCartCounts] = useState<CartCountData>({ cartLength: 0, totalPrice: 0 });

  const { cartItems, cartCount, syncDeriveCount, syncGuest, syncItems } = useCart();

  useEffect(() => {
    console.log("Component:", cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (id) {
      syncDeriveCount();
      syncItems();
    };
    syncGuest();
  }, [id, syncDeriveCount, syncGuest, syncItems])

  // const loggedIn = session ? true : false;
  // const realCartData = session ? cartData : localCart;

  // const [optimisticCart, setOptimisticCart] = useOptimistic(realCartData,
  //   (state, action: { itemId: string, quantity: number }) => {
  //     const { itemId, quantity } = action;
  //     return state.map(item => item.itemId === itemId ? { ...item, quantity } : item)
  //   },
  // );

  // const handleUpdateCartQ = async (itemId: string, delta: number, currentQuantity: number, option: string) => {
  //   console.log('object handleupdateCartQ');
  //   // let updated = false;

  //   // if (option === "incr") {
  //   //   updated = await increaseItemQuantityHelper(itemId, loggedIn);
  //   // } else {
  //   //   updated = await decreaseItemQuantityHelper(itemId, loggedIn);
  //   // };

  //   // startTransition(() => {
  //   //   setOptimisticCart({ itemId, quantity: currentQuantity + delta })
  //   // });
  // };


  // useEffect(() => {
  //   if (id) return;

  //   const localCart = JSON.parse(localStorage.getItem("cart") || '[]') as LocalCartItem[];
  //   // eslint-disable-next-line react-hooks/set-state-in-effect
  //   setLocalCart(localCart);
  // }, [id]);

  // useEffect(() => {
  //   // if (!id) return;
  //   // syncDeriveCount();
  //   // syncItems();

  //   // const pushLocalData = async () => {
  //   //   if (localCart.length > 0) {

  //   //     const data = JSON.stringify(localCart)
  //   //     const res = await serverMutation('/api/v1/cart/create', { userId: id, userName: name, checkedItem: "[]", localCart: data }, "POST");

  //   //     if (!res.success) return;
  //   //     localStorage.removeItem('cart');
  //   //     return res;
  //   //   };

  //   // };

  //   // if (id) {
  //   //   pushLocalData();
  //   // };

  //   // const controller = new AbortController();
  //   // getDataByQueryParams<CartResponse>(`/api/v1/cart/get/items?mode=${isOpen ? "items" : "count"}&userId=${id}`, controller.signal)
  //   //   .then(({ data }) => {
  //   //     if (isCartItemsData(data)) {
  //   //       setCartData(data.cartItems ?? [])
  //   //       // console.log(data);
  //   //     } else if (data) {
  //   //       setCartCounts({ cartLength: data.cartLength, totalPrice: data.totalPrice })
  //   //     }
  //   //   })
  //   //   .catch(() => { });
  //   // return () => controller.abort();
  // }, [isOpen, id, name, syncDeriveCount, syncItems])


  // const drawerTotal = cartItems.reduce((total, item) => {
  //   return total + Number(item?.itemPrice ?? 0);
  // }, 0);

  const cartLength = cartCount.cartLength;
  const totalPrice = cartCount.totalPrice;

  return (
    <>
      {
        forNav ? (
          <Link href={'/cart'} className="relative">
            <div className="">
              <PaperBag size={30} />
            </div>
            <span className="absolute -top-1 -right-2 border-2 bg-white dark:bg-black border-primary rounded-full p-1 text-[9px]">{cartLength}</span>
          </Link>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="z-50 flex items-center gap-3 bg-secondary dark:bg-tertiary hover:bg-primary/90 text-tertiary dark:text-secondary px-6 py-4 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95"
          >
            <div className="relative">
              <ShoppingBag />
              <span className="absolute -top-2 -right-2 w-5 h-5 border border-primary bg-secondary dark:bg-tertiary  text-xs font-bold rounded-full flex items-center justify-center text-primary">
                {cartLength}
              </span>
            </div>
            <div className="text-left">
              <p className="text-lg font-bold">${totalPrice}</p>
            </div>
          </button>
        )
      }

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 h-full bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute w-full max-w-md bg-tertiary dark:bg-secondary h-full shadow-2xl flex flex-col animate-slide-in-right">
            <div className="shrink-0 flex items-center justify-between p-6 border-b border-neutral/20">
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

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length <= 0 ? (
                <div className='h-full flex justify-center items-center text-center flex gap-4 bg-white dark:bg-neutral/20 p-4 rounded-xl'>
                  Your Cart Is Empty
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 bg-white dark:bg-neutral/20 p-4 rounded-xl">
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary dark:text-tertiary">
                        {item.itemName}
                      </h4>
                      <p className="text-primary font-bold">${item.itemPrice ?? 1}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          // onClick={() => handleUpdateCartQ(item.itemId, -1, item.quantity, "decr")}
                          // onClick={() => decreaseItemQuantityHelper(item.itemId, loggedIn)}
                          className="p-1 hover:text-primary transition-colors">
                          <MinusIcon />
                        </button>
                        <span className="font-semibold w-6 text-center">{item.quantity}</span>
                        <button
                          // onClick={() => handleUpdateCartQ(item.itemId, +1, item.quantity, "incr")}
                          // onClick={() => handleUpdateCart(item.itemId, 1, item.quantity)}
                          // onClick={() => increaseItemQuantityHelper(item.itemId, loggedIn)}
                          className="p-1 hover:text-primary transition-colors">
                          <Plus />
                        </button>
                        <button className="ml-auto p-1 text-red-500 hover:text-red-600">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="shrink-0 border-t border-neutral/20 p-6 space-y-4 justify-end items-end">
              <div className="flex justify-between items-center text-lg">
                <span className="text-neutral">Subtotal</span>
                <span className="font-bold text-secondary dark:text-tertiary">
                  ${totalPrice}
                </span>
              </div>
              <Link
                href="/checkout"
                className="block w-full bg-primary hover:bg-primary/90 text-tertiary text-center py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
