'use client'
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
    ChevronLeft,
    ChevronRight,
    type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';

interface MenuNavProps {
  activeMenu: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export default function MenuNav({ activeMenu }: MenuNavProps) {
    const [isOpen, setIsOpen] = useState(false);
    const active = activeMenu ?? 'all';

    const menuCategories: NavItem[] = [
        { name: 'All', href: '/menu', icon: HandPlatter },
        { name: 'Starters', href: '/menu?category=starters', icon: UtensilsCrossed },
        { name: 'Mains', href: '/menu?category=mains', icon: ChefHat },
        { name: 'Drinks', href: '/menu?category=drinks', icon: Wine },
        { name: 'Desserts', href: '/menu?category=desserts', icon: IceCream },
    ];

    const bottomLinks: NavItem[] = [
        { name: 'Dietary Info', href: '/menu/dietary-info', icon: Info },
        { name: 'Contact', href: '/menu/contact', icon: Mail },
    ];

    return (
        <aside className='fixed z-99'>
            <div className='relative w-full bg-tertiary dark:bg-secondary md:min-h-screen md:shadow-sm'>
                {
                    isOpen && (
                        <button
                            type="button"
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="absolute right-3 top-100 bottom-100 z-999 flex h-10 w-10 items-center justify-center rounded-full border border-neutral/20 bg-primary text-tertiary shadow-sm backdrop-blur"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                    )
                }

                {!isOpen && (
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="absolute left-3 top-100 bottom-100 z-999 flex h-10 w-10 items-center justify-center rounded-full border border-neutral/20 bg-primary text-tertiary shadow-sm backdrop-blur"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                )}

                {
                    isOpen &&
                    <nav className={`fixed left-0 top-0 z-40 flex h-screen min-w-60 flex-col overflow-y-auto bg-tertiary shadow-xl transition-transform duration-200 dark:bg-secondary md:static md:h-screen md:w-full md:translate-x-0 md:flex md:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
                                        onClick={() => setIsOpen(false)}
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
                                onClick={() => setIsOpen(false)}
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
                                            onClick={() => setIsOpen(false)}
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
                }
            </div>
        </aside>
    );
}
