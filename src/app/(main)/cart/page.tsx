'use client';
import Link from 'next/link';
import { HandPlatter } from 'lucide-react';
import CartItemCard from '@/components/pages/Cart/CartItemCard';
import OrderSummary from '@/components/pages/Cart/OrderSummary';
import { useCart } from '@/components/providers/CartProvider';
import { useEffect } from 'react';

const CartPage = () => {
    const { cartItems, cartCount, syncItems, updateQuantity, removeItem } = useCart();

    useEffect(()=> {
        syncItems(true);
    }, [syncItems]);

    return (
        <div className="mx-auto grid max-w-full grid-cols-1 gap-3">
            <div className="min-w-0 min-h-screen bg-wh-p dark:bg-bl-p gap-3 px-4 sm:px-6 lg:px-2 py-8">
                <div className="flex flex-col lg:flex-row items-center lg:justify-between bg-wh-s dark:bg-bl-p mx-3 p-3 gap-4 mb-15">
                    <div className="space-y-2 text-center lg:text-left">
                        <h1 className="text-4xl font-serif font-bold text-secondary dark:text-tertiary">
                            Your Cart
                        </h1>
                        <p className="text-neutral dark:text-neutral/80">
                            {cartCount.cartLength} {cartCount.cartLength === 1 ? 'item' : 'items'} in your bag
                        </p>
                    </div>
                    <Link
                        href="/menu"
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-secondary dark:text-tertiary border border-neutral/20 hover:border-primary hover:text-primary transition-all"
                    >
                        <HandPlatter className="w-4 h-4" />
                        Back to Menu
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <div className="mx-3 bg-white dark:bg-neutral/20 rounded-2xl border border-neutral/10 shadow-sm p-16 text-center space-y-4">
                        <p className="text-neutral text-lg">Your cart is empty.</p>
                        <Link
                            href="/menu"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-tertiary px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg active:scale-95"
                        >
                            <HandPlatter className="w-5 h-5" />
                            Browse Menu
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:px-6">
                        <div className="lg:col-span-2 space-y-5">
                            {cartItems.map((item) => (
                                <CartItemCard
                                    key={item.itemId}
                                    id={item.itemId}
                                    name={item.itemName}
                                    description={item.itemDesc ?? 'Epmty Description'}
                                    price={item.itemPrice}
                                    quantity={item.quantity}
                                    imageUrl={item.imageUrl ?? ''}
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeItem}
                                />
                            ))}
                        </div>
                        <OrderSummary subtotal={cartCount.totalPrice} itemCount={cartCount.cartLength} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
