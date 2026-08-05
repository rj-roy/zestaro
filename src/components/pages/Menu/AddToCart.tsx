'use client';
import { useActionState, useEffect, useState, useTransition } from 'react';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import { LocalCartItem } from '@/types/LocalCartItem';
import { addCartAction, CartActionState } from '@/actions/cart/addCartActions';

const initialState: CartActionState = {
    added: false,
};

interface AddToCartProps {
    itemId?: string;
    itemName?: string;
    isExistInDbCart?: boolean;
    userId?: string;
    itemPrice?: number;
}

export default function AddToCart({ itemId, itemName, itemPrice, isExistInDbCart, userId }: AddToCartProps) {
    const [localAdded, setLocalAdded] = useState(false);

    const [state, formAction, pending] = useActionState(addCartAction, initialState);
    const [, startTransition] = useTransition();

    useEffect(() => {
        const update = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]') as LocalCartItem[];
            setLocalAdded(cart.some((item) => item.itemId === itemId));
        };

        update();
        window.addEventListener('storage', update);
        return () => window.removeEventListener('storage', update);
    }, [itemId]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cart = JSON.parse(localStorage.getItem('cart') || '[]') as LocalCartItem[];

        if (userId) {
            const form = new FormData(e.currentTarget);

            const localCart = JSON.parse(localStorage.getItem('cart') || '[]') as LocalCartItem[];
            if (localCart.length > 0) {
                form.set('localCart', JSON.stringify(localCart));
            };

            startTransition(() => { formAction(form); });
            return;
        };

        const alreadyInCart = cart.some((item) => item.itemId === itemId);
        if (!alreadyInCart) {
            cart.push({ itemId, itemName, itemPrice, quantity: 1 });
        };

        localStorage.setItem('cart', JSON.stringify(cart));
        toast.success('Item added to cart');
        setLocalAdded(true);
    };

    useEffect(() => {
        if (state.added) {
            localStorage.removeItem('cart');
            toast.success("Item Added to cart.")
        }
    }, [state]);

    const isAdded = isExistInDbCart || localAdded || state.added;

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 pt-2 w-full"
        >
            <input type="hidden" name="checkedItem" value={JSON.stringify({ itemId, itemName, itemPrice, quantity: 1 })} />

            <button
                type="submit"
                disabled={pending || isAdded}
                className={`disabled:bg-secondary disabled:cursor-not-allowed cursor-pointer flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-tertiary px-4 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg active:scale-95 disabled:opacity-70`}
            >
                <ShoppingCart className="w-4 h-4" />

                {pending ? "Adding..." : isAdded ? "Added to Cart" : "Add to Cart"}
            </button>
        </form>
    );
}
