export default function MenuHeader({ category }) {
    const categoryData = {
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

    const currentData = categoryData[category];

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