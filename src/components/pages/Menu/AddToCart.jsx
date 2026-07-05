'use client';
import { useActionState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { handleAddToCart } from './handleAddToCart';

const initialState = {
    added: false,
};

export default function AddToCart({ itemId }) {
    const [state, formAction, pending] = useActionState(
        handleAddToCart,
        initialState
    );

    return (
        <form
            action={formAction}
            className="flex items-center gap-3 pt-2 w-full"
        >
            <input type="hidden" name="productId" value={itemId} />

            <button
                type="submit"
                disabled={pending || state.added}
                className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-tertiary px-4 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg active:scale-95 disabled:opacity-70"
            >
                <ShoppingCart className="w-4 h-4" />

                {pending
                    ? "Adding..."
                    : state.added
                        ? "Added"
                        : "Add to Cart"}
            </button>
        </form>
    );
}