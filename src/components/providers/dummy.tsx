'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { getDataByQueryParams } from '@/lib/api/getData';
import { serverMutation } from '@/lib/core/server';
import { removeCartItemAction, updateCartQuantityAction } from '@/actions/cart/updateCartActions';
import { LocalCartItem } from '@/types/LocalCartItem';
import { CartCountData, CartItemType } from '@/types/MenuPage';

const STORAGE_KEY = 'cart';

interface CartItemsData {
    cartItems: CartItemType[];
};

type CartResponse = CartItemsData | CartCountData;

const isCartItemsData = (data: CartResponse | null | undefined): data is CartItemsData =>
    !!data && 'cartItems' in data;

interface CartContextValue {
    items: CartItemType[];
    count: CartCountData;
    status: 'loading' | 'ready';
    addItem: (item: Omit<CartItemType, 'quantity'>) => void;
    updateQuantity: (itemId: string, delta: number) => void;
    removeItem: (itemId: string) => void;
    refresh: () => void;
    refreshItems: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const normalizeItem = (item: LocalCartItem): CartItemType => ({
    itemId: item.itemId ?? '',
    itemName: item.itemName ?? '',
    itemPrice: Number(item.itemPrice) || 0,
    quantity: Number(item.quantity) || 1,
});

const readLocalStorage = (): CartItemType[] => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
        return (JSON.parse(raw) as LocalCartItem[]).map(normalizeItem);
    } catch {
        return [];
    }
};

const deriveCount = (items: CartItemType[]): CartCountData => ({
    cartLength: items.length,
    totalPrice: items.reduce(
        (total, item) => total + Number(item.itemPrice ?? 0) * (Number(item.quantity) || 1),
        0
    ),
});

export function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const { data: session, isPending } = authClient.useSession();
    const [items, setItems] = useState<CartItemType[]>([]);
    const [count, setCount] = useState<CartCountData>({ cartLength: 0, totalPrice: 0 });
    const [status, setStatus] = useState<'loading' | 'ready'>('loading');
    const pushedRef = useRef<Set<string>>(new Set());

    const id = session?.user.id;
    const name = session?.user.name;
    const loggedIn = !!id;

    const syncGuest = useCallback(() => {
        const localItems = readLocalStorage();
        setItems(localItems);
        setCount(deriveCount(localItems));
        setStatus('ready');
    }, []);

    const refresh = useCallback(() => {
        if (!id) {
            syncGuest();
            return;
        }

        getDataByQueryParams<CartResponse>(`/api/v1/cart/get/items?mode=count&userId=${id}`)
            .then(({ data }) => {
                if (data && 'cartLength' in data) {
                    setCount({ cartLength: data.cartLength, totalPrice: data.totalPrice });
                }
            })
            .catch(() => { });
    }, [id, syncGuest]);

    const refreshItems = useCallback(() => {
        if (!id) {
            syncGuest();
            return;
        }

        getDataByQueryParams<CartResponse>(`/api/v1/cart/get/items?mode=items&userId=${id}`)
            .then(({ data }) => {
                if (isCartItemsData(data)) {
                    setItems(data.cartItems ?? []);
                    // setCount(deriveCount(data.cartItems ?? []));
                }
            })
            .catch(() => { });
    }, [id, syncGuest]);

    const addItem = useCallback((item: Omit<CartItemType, 'quantity'>) => {
        if (loggedIn) return;

        const next = [...items];
        if (!next.some((i) => i.itemId === item.itemId)) {
            next.push({ ...item, quantity: 1 });
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setItems(next);
        setCount(deriveCount(next));
    }, [items, loggedIn]);

    const updateQuantity = useCallback((itemId: string, delta: number) => {
        const next = items.reduce<CartItemType[]>((acc, item) => {
            if (item.itemId !== itemId) {
                acc.push(item);
                return acc;
            }
            const quantity = (Number(item.quantity) || 1) + delta;
            if (quantity >= 1) acc.push({ ...item, quantity });
            return acc;
        }, []);

        if (!loggedIn) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        }

        setItems(next);
        setCount(deriveCount(next));

        if (!loggedIn) return;

        const item = next.find((i) => i.itemId === itemId);
        if (item) {
            updateCartQuantityAction(itemId, item.quantity).then((success) => {
                if (success) refresh();
            });
        } else {
            removeCartItemAction(itemId).then((success) => {
                if (success) refresh();
            });
        }
    }, [items, loggedIn, refresh]);

    const removeItem = useCallback((itemId: string) => {
        const next = items.filter((item) => item.itemId !== itemId);

        if (!loggedIn) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        }

        setItems(next);
        setCount(deriveCount(next));

        if (!loggedIn) return;

        removeCartItemAction(itemId).then((success) => {
            if (success) refresh();
        });
    }, [items, loggedIn, refresh]);

    useEffect(() => {
        if (isPending) return;

        /* eslint-disable react-hooks/set-state-in-effect */
        setItems([]);
        setCount({ cartLength: 0, totalPrice: 0 });
        setStatus('loading');
        /* eslint-enable react-hooks/set-state-in-effect */

        if (id) {
            const pushLocalData = async () => {
                const localItems = readLocalStorage();
                if (localItems.length > 0 && !pushedRef.current.has(id)) {
                    pushedRef.current.add(id);
                    const res = await serverMutation(
                        '/api/v1/cart/create',
                        { userId: id, userName: name, checkedItem: "[]", localCart: JSON.stringify(localItems) },
                        "POST"
                    );
                    if (res.success) localStorage.removeItem(STORAGE_KEY);
                }
            };
            pushLocalData();
            refresh();
        } else {
            syncGuest();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, isPending]);

    useEffect(() => {
        const onStorage = (event: StorageEvent) => {
            if (event.key !== STORAGE_KEY) return;
            if (id) refresh();
            else syncGuest();
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, [id, refresh, syncGuest]);

    return (
        <CartContext.Provider
            value={{ items, count, status, addItem, updateQuantity, removeItem, refresh, refreshItems }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}