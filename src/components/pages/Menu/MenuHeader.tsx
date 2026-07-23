const categoryData: Record<string, { title: string; description: string }> = {
    all: {
        title: 'All Items',
        description: "Let's grab all the available dish",
    },
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

interface MenuHeaderProps {
  category: string;
}

export default function MenuHeader({ category }: MenuHeaderProps) {
    const currentData = categoryData[category] ?? categoryData.all;

    return (
        <div className="space-y-2">
            <h1 className="text-4xl font-serif font-bold text-secondary dark:text-tertiary">
                {currentData.title}
            </h1>
            <p className="text-neutral dark:text-neutral/80 max-w-xl">
                {currentData.description}
            </p>
        </div>
    );
}
