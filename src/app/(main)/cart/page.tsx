'use client';
import { useState } from 'react';
import Link from 'next/link';
import { HandPlatter } from 'lucide-react';
import CartItemCard from '@/components/pages/Cart/CartItemCard';
import OrderSummary from '@/components/pages/Cart/OrderSummary';

interface StaticCartItem {
  id: string;
  name: string;
  description: string;
  tag: string;
  price: number;
  quantity: number;
}

const initialItems: StaticCartItem[] = [
  {
    id: '1',
    name: 'Grilled Salmon',
    description: 'Wood-fired salmon fillet with lemon herb butter and charred asparagus.',
    tag: 'Sea-Food',
    price: 24.99,
    quantity: 1,
  },
  {
    id: '2',
    name: 'Truffle Pasta',
    description: 'Creamy tagliatelle tossed with black truffle shavings and aged parmesan.',
    tag: 'Vegetarian',
    price: 18.5,
    quantity: 2,
  },
  {
    id: '3',
    name: 'Berry Cheesecake',
    description: 'Baked cheesecake with mixed berry compote and vanilla crumble.',
    tag: 'Dessert',
    price: 9.99,
    quantity: 1,
  },
];

const CartPage = () => {
  const [items, setItems] = useState<StaticCartItem[]>(initialItems);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="mx-auto grid max-w-full grid-cols-1 gap-3">
      <div className="min-w-0 min-h-screen bg-wh-p dark:bg-bl-p gap-3 px-4 sm:px-6 lg:px-2 py-8">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between bg-wh-s dark:bg-bl-p mx-3 p-3 gap-4 mb-15">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-4xl font-serif font-bold text-secondary dark:text-tertiary">
              Your Cart
            </h1>
            <p className="text-neutral dark:text-neutral/80">
              {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in your bag
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

        {items.length === 0 ? (
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
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  tag={item.tag}
                  price={item.price}
                  quantity={item.quantity}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
            <OrderSummary subtotal={subtotal} itemCount={totalQuantity} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
