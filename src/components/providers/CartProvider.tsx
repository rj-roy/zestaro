'use client'
import { getDataByParamsId, getDataByQueryParams } from "@/lib/api/getData";
import { authClient } from "@/lib/auth-client";
import { serverMutation } from "@/lib/core/server";
import { CartContextValue, CartCountData, CartItemType } from "@/types/MenuPage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CartItemsData {
    cartItems: CartItemType[];
}
type CartResponse = CartItemsData | CartCountData;
const isCartItemsData = (data: CartResponse | null | undefined): data is CartItemsData => !!data && "cartItems" in data;

const storagekey = process.env.CART_STORAGE_KEY || "cart";
const CartContext = createContext<CartContextValue | null>(null);

const normaLizeItem = (item: CartItemType): CartItemType => ({
    itemId: item.itemId ?? '',
    itemName: item.itemName ?? '',
    itemPrice: item.itemPrice ?? 0,
    quantity: item.quantity ?? 0,
})
const readLocal = () => {
    const raw = localStorage.getItem(storagekey);
    if (!raw) return [];

    try {
        return (JSON.parse(raw) as CartItemType[]).map(normaLizeItem);
    } catch {
        return [];
    };
};

const deriveCount = (items: CartItemType[]): CartCountData => ({
    cartLength: items.length,
    totalPrice: items.reduce((total, item) => total + Number(item.itemPrice ?? 0) * Number(item.quantity), 0)
});

export const CartProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const { data: session, isPending } = authClient.useSession();
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [cartCount, setCartCount] = useState<CartCountData>({ cartLength: 0, totalPrice: 0 });
    const [status, setStatus] = useState<'loading' | 'ready'>('loading');
    const text = "test"

    const id = session?.user.id;
    const name = session?.user.name;
    const isLoggedid = !!id;

    const syncGuest = useCallback(() => {
        const localItems = readLocal();
        setCartItems(localItems);
        setCartCount(deriveCount(localItems));
        setStatus('ready');
    }, []);

    const syncDeriveCount = useCallback(async () => {
        if (!id) {
            syncGuest()
            return;
        };

        const { data } = await getDataByQueryParams<CartResponse>(`/api/v1/cart/get/items?mode=count&userId=${id}`);
        if (data && "cartLength" in data) {
            setCartCount({ cartLength: data.cartLength, totalPrice: data.totalPrice });
        };

    }, [id, syncGuest])

    const syncItems = useCallback(async () => {
        if (!id) {
            syncGuest();
            return;
        };

        const { data } = await getDataByQueryParams<CartResponse>(`/api/v1/cart/get/items?mode=items&userId=${id}`);
        if (isCartItemsData(data)) {
            setCartItems(data.cartItems ?? [])
            setCartCount(deriveCount(data.cartItems ?? []));
        };

    }, [id, syncGuest]);

    const pushLocalToDb = async () => {
        if (!id) return;
        const localItems = readLocal();
        if (localItems.length > 0) {
            const data = { userId: id, userName: name, localCart: localItems };
            const createCart = await serverMutation('/api/v1/cart/create', data, 'POST')

            if (createCart.success) {
                localStorage.removeItem('cart');
            } else {
                console.log("localData not updated");
            };
        }

    }

    return (
        <CartContext.Provider
            value={{ cartItems, cartCount, syncGuest, syncDeriveCount, syncItems, pushLocalToDb }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("Cart context not found");
    };
    return context;
};