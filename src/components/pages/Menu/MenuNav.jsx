import Link from 'next/link';
import {
    UtensilsCrossed,
    ChefHat,
    Wine,
    IceCream,
    ShoppingCart,
    Info,
    Mail,
    HandPlatter,
} from 'lucide-react';

export default function MenuNav({ activeMenu }) {
    const active = activeMenu ?? 'all';

    const menuCategories = [
        { name: 'All', href: '/menu', icon: HandPlatter },
        { name: 'Starters', href: '/menu?category=starters', icon: UtensilsCrossed },
        { name: 'Mains', href: '/menu?category=mains', icon: ChefHat },
        { name: 'Drinks', href: '/menu?category=drinks', icon: Wine },
        { name: 'Desserts', href: '/menu?category=desserts', icon: IceCream },
    ];

    const bottomLinks = [
        { name: 'Dietary Info', href: '/menu/dietary-info', icon: Info },
        { name: 'Contact', href: '/menu/contact', icon: Mail },
    ];

    return (
        <nav className="md:fixed flex min-h-screen max-w-xs flex-col h-full bg-tertiary dark:bg-secondary">
            {/* Header */}
            <div className="px-2 pt-8 pb-6">
                <h1 className="text-xl font-serif font-bold text-primary">
                    Zestaro
                </h1>
                <p className="text-sm text-neutral dark:text-neutral/80 mt-1">
                    Editorial Menu
                </p>
            </div>

            {/* Menu Categories */}
            <div className="flex-1 px-4 space-y-1">
                {menuCategories.map((category) => {
                    const Icon = category.icon;
                    const isActive = active === category.name.toLowerCase();

                    return (
                        <Link
                            key={category.name}
                            href={category.href}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                ? 'bg-primary text-tertiary shadow-md'
                                : 'text-secondary dark:text-tertiary hover:bg-neutral/10 dark:hover:bg-neutral/20'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{category.name}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Section */}
            <div className="px-4 pb-8 space-y-4">
                {/* Divider */}
                <div className="border-t border-neutral/30 dark:border-neutral/50" />

                {/* View Cart Button */}
                <Link
                    href="/cart"
                    className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-tertiary dark:text-secondary px-4 py-3.5 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    <ShoppingCart className="w-5 h-5" />
                    <span>View Cart</span>
                </Link>

                {/* Bottom Links */}
                <div className="space-y-1">
                    {bottomLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="flex items-center gap-3 px-4 py-2.5 text-secondary dark:text-tertiary hover:text-primary dark:hover:text-primary hover:bg-neutral/10 dark:hover:bg-neutral/20 rounded-lg text-sm font-medium transition-colors"
                            >
                                <Icon className="w-5 h-5" />
                                <span>{link.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}