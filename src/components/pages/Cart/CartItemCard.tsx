'use client';
import { MinusIcon, Plus, Trash2, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';

interface CartItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemCard({ id, name, description, price, quantity, imageUrl, onUpdateQuantity, onRemove }: CartItemCardProps) {
  return (
    <div className="flex gap-4 bg-white dark:bg-neutral/20 p-4 rounded-2xl border border-neutral/10 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-primary/25 to-primary/10 flex items-center justify-center">
        {
          imageUrl ? <Image src={imageUrl} alt={name} width={100} height={100} loading='eager' className='rounded-xl' />
            : <UtensilsCrossed className="w-10 h-10 text-primary/70" />
        }
      </div>

      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-serif font-bold text-secondary dark:text-tertiary line-clamp-1">
            {name}
          </h3>
          <span className="text-lg font-bold text-primary shrink-0">
            ${(price * quantity).toFixed(2)}
          </span>
        </div>

        <p className="text-neutral text-sm line-clamp-2">{description}</p>

        <div className="flex items-center gap-3 pt-1">
          <div className="flex items-center gap-2 bg-wh-p dark:bg-secondary/40 rounded-full px-2 py-1 border border-neutral/20">
            <button
              onClick={() => onUpdateQuantity(id, -1)}
              aria-label="Decrease quantity"
              className="p-1.5 hover:text-primary transition-colors"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            <span className="font-semibold w-6 text-center text-secondary dark:text-tertiary">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(id, 1)}
              aria-label="Increase quantity"
              className="p-1.5 hover:text-primary transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onRemove(id)}
            className="ml-auto p-2 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
            aria-label={`Remove ${name}`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
