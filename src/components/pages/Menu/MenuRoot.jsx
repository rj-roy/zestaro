// 'use client'
import FilterTags from '@/components/pages/Menu/FilterTags';
// import FloatingCart from '@/components/pages/Menu/FoatingCat';
// import MenuGrid from '@/components/pages/Menu/MenuGrid';
import MenuHeader from '@/components/pages/Menu/MenuHeader';
import SearchBar from '@/components/pages/Menu/SearchBar';
// import { useState } from 'react';

export default function MenuRoot({ menuItems, query }) {
    let activeCategory = '';
    if (query?.category) {
        activeCategory = query?.category;
    } else {
        activeCategory = 'all';
    };

    let searchValue = '';

    // const [selectedCategory, setSelectedCategory] = useState('starters');
    // const [selectedFilters, setSelectedFilters] = useState([]);
    // const [searchQuery, setSearchQuery] = useState('');
    // const [cartItems, setCartItems] = useState([
    //     { id: 1, name: 'Heirloom Tomato', price: 18, quantity: 2 },
    //     { id: 2, name: 'Seared Scallops', price: 24, quantity: 1 },
    // ]);
    // const addToCart = (item) => {
    //     setCartItems((prev) => {
    //         const existing = prev.find((i) => i.id === item.id);
    //         if (existing) {
    //             return prev.map((i) =>
    //                 i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
    //             );
    //         }
    //         return [...prev, { ...item, quantity: 1 }];
    //     });
    // };

    // const updateQuantity = (id, delta) => {
    //     setCartItems((prev) =>
    //         prev
    //             .map((item) =>
    //                 item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    //             )
    //             .filter((item) => item.quantity > 0)
    //     );
    // };

    // const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-screen bg-tertiary dark:bg-secondary gap-3">
            <div className="px-4 sm:px-6 lg:px-2 py-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                    <MenuHeader
                        category={activeCategory}
                    />
                    <SearchBar
                        query={query}
                        menuItems={menuItems}
                    />
                </div>

                <FilterTags
                    query={query}
                />

                {/* <MenuGrid
                    category={selectedCategory}
                    filters={selectedFilters}
                    searchQuery={searchQuery}
                    onAddToCart={addToCart}
                    onUpdateQuantity={updateQuantity}
                /> */}
            </div>

            {/* <FloatingCart
                items={cartItems}
                total={cartTotal}
                count={cartCount}
                onUpdateQuantity={updateQuantity}
            /> */}
        </div>
    );
}