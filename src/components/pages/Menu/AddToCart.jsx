'use client';
import { useActionState, useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { handleAddToCart } from './handleAddToCart';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const initialState = {
    added: false,
};

export default function AddToCart({ itemId }) {
    const [localAdded, setLocalAdded] = useState(false);
    const { data: session } = authClient.useSession();

    const [state, formAction, pending] = useActionState(
        handleAddToCart,
        initialState
    );

    useEffect(() => {
        const update = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            setLocalAdded(cart.includes(itemId));
        };

        update();
        window.addEventListener('storage', update);
        return () => window.removeEventListener('storage', update);
    }, [itemId]);
    
    const handleSubmit = (e) => {
        if (session) return;
        e.preventDefault();

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        if (!cart.includes(itemId)) {
            cart.push(itemId);
        };

        localStorage.setItem('cart', JSON.stringify(cart));
        toast.success("Item added to cart")
        setLocalAdded(cart.includes(itemId));
    };

    return (
        <form
            action={formAction}
            onSubmit={handleSubmit}
            className="flex items-center gap-3 pt-2 w-full"
        >
            <input type="hidden" name="productId" value={itemId} />

            <button
                type="submit"
                disabled={pending || state.added || localAdded}
                className={`disabled:bg-secondary disabled:cursor-not-allowed cursor-pointer flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-tertiary px-4 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg active:scale-95 disabled:opacity-70`}
            >
                <ShoppingCart className="w-4 h-4" />

                {pending ? "Adding..." : state.added || localAdded ? "Added to Cart" : "Add to Cart"}
            </button>
        </form>
    );
}