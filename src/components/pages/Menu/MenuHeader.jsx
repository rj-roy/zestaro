'use client';

import Link from 'next/link';

const categories = [
  { id: 'starters', name: 'Starters', href: '/menu/starters' },
  { id: 'mains', name: 'Mains', href: '/menu/mains' },
  { id: 'drinks', name: 'Drinks', href: '/menu/drinks' },
  { id: 'desserts', name: 'Desserts', href: '/menu/desserts' },
];

export default function MenuHeader({ category, setCategory }) {
  const categoryData = {
    starters: {
      title: 'Starters',
      description: 'Curated small plates crafted with seasonal ingredients and traditional artisanal techniques.',
    },
    mains: {
      title: 'Mains',
      description: 'Hearty entrees featuring premium ingredients and bold flavors from around the world.',
    },
    drinks: {
      title: 'Drinks',
      description: 'Refreshing beverages, craft cocktails, and curated wine selections.',
    },
    desserts: {
      title: 'Desserts',
      description: 'Decadent sweet endings to complete your culinary journey.',
    },
  };

  const currentData = categoryData[category];

  return (
    <div className="space-y-2">
      <nav className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              category === cat.id
                ? 'bg-primary text-tertiary'
                : 'bg-white dark:bg-neutral/20 text-secondary dark:text-tertiary hover:bg-neutral/10'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </nav>
      <h1 className="text-4xl font-serif font-bold text-secondary dark:text-tertiary">
        {currentData.title}
      </h1>
      <p className="text-neutral dark:text-neutral/80 max-w-xl">
        {currentData.description}
      </p>
    </div>
  );
}