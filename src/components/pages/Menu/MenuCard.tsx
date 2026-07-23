import Image from 'next/image';
import { MenuItem } from '@/types/MenuPage';
import AddToCart from './AddToCart';

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  return (
    <div className="flex flex-col justify-between group bg-white dark:bg-neutral/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral/10">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={item.imageUrl ?? ''}
          alt={item.name ?? ''}
          height={500}
          loading='eager'
          width={500}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {item.dietaryTags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/90 dark:bg-secondary/90 backdrop-blur-sm rounded-md text-xs font-semibold text-secondary dark:text-tertiary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-serif font-bold text-secondary dark:text-tertiary">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-primary">৳{item.price}</span>
        </div>

        <p className="text-neutral text-sm line-clamp-2">{item.description}</p>

        {/* Quantity Selector & Add to Cart */}
        <div className="flex items-center gap-3 pt-2">
          <AddToCart itemId={item._id} />
        </div>
      </div>
    </div>
  );
}
