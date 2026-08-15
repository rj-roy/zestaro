'use client'
import { removeCartAction } from "@/actions/cart/removeCartAction";
import { serverUpdateQuantity } from "@/actions/cart/updateCartActions";
import { getDataByQueryParams } from "@/lib/api/getData";
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
    itemDesc: item.itemDesc ?? '',
    quantity: item.quantity ?? 0,
    imageUrl: item.imageUrl ?? '',
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

    const id = session?.user.id;
    const name = session?.user.name;

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

    const syncItems = useCallback(async (image?: boolean) => {
        if (!id) {
            syncGuest();
            return;
        };

        const { data } = await getDataByQueryParams<CartResponse>(`/api/v1/cart/get/items?mode=items&userId=${id}&image=${image}`);
        if (isCartItemsData(data)) {
            setCartItems(data.cartItems ?? [])
            setCartCount(deriveCount(data.cartItems ?? []));
        };

    }, [id, syncGuest]);

    const pushLocalToDb = useCallback(async () => {
        if (!id) return;
        const localItems = readLocal();
        if (localItems.length > 0) {
            const data = { userId: id, userName: name, localCart: localItems };
            const createCart = await serverMutation('/api/v1/cart/create', data, 'POST')

            if (createCart.success) {
                localStorage.removeItem(storagekey);
            } else {
                console.log("localData not updated");
            };
        }
    }, [id, name]);

    const updateQuantity = useCallback(async (itemId: string, delta: number) => {
        const updateItems = cartItems.reduce<CartItemType[]>((acc, item) => {
            if (item.itemId !== itemId) {
                acc.push(item);
                return acc;
            };

            if (item.quantity <= 1 && delta === -1) {
                toast.error("Minimum required quantity is 1. You can remove it");
                acc.push(item);
                return acc;
            };

            const newQuantity = (Number(item.quantity)) + delta;
            if (newQuantity >= 1) {
                acc.push({ ...item, quantity: newQuantity });
            };
            return acc;
        }, []);

        setCartItems(updateItems);
        setCartCount(deriveCount(updateItems));
        if (!id) {
            localStorage.setItem(storagekey, JSON.stringify(updateItems));
            syncGuest()
            return;
        };

        const selectedUpdateI = updateItems.find((i) => i.itemId === itemId);

        if (id && selectedUpdateI) {
            const updated = await serverUpdateQuantity(id, selectedUpdateI.itemId, selectedUpdateI.quantity);
            if (!updated?.success) {
                toast.error(updated?.message || "Something went wrong! Please try again later.");
            };

            syncItems();
            syncDeriveCount();
        };

    }, [cartItems, id, syncDeriveCount, syncGuest, syncItems]);

    const removeItem = useCallback(async (itemId: string) => {

        if (!itemId) return;
        const updateItems = cartItems.filter((i) => i.itemId !== itemId);

        if (!id) {
            localStorage.setItem(storagekey, JSON.stringify(updateItems));
            syncGuest();
            toast.success("Removed");
            return;
        };

        setCartItems(updateItems);
        setCartCount(deriveCount(updateItems));

        if (id) {
            const res = await removeCartAction(id, itemId);
            if (!res.success) {
                console.log(res);
                syncItems();
                toast.error("Something went wrong!");
                return;
            };
            return toast.success("removed");
        };

    }, [cartItems, id, syncGuest, syncItems]);

    return (
        <CartContext.Provider
            value={{ cartItems, setCartItems, cartCount, syncGuest, syncDeriveCount, syncItems, pushLocalToDb, updateQuantity, removeItem }}
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