import FilterTags from "@/components/pages/Menu/FilterTags";
import MenuGrid from "@/components/pages/Menu/MenuGrid";
import MenuHeader from "@/components/pages/Menu/MenuHeader";
import MenuNav from "@/components/pages/Menu/MenuNav";
import SearchBar from "@/components/pages/Menu/SearchBar";
import { getDataByQueryParams } from "@/lib/api/getData";

const MenuPage = async ({ searchParams }) => {
    const query = await searchParams;
    const params = new URLSearchParams(query);
    params.delete("search");
    const menuItems = await getDataByQueryParams(`/api/v1/get/menu/query?${params.toString() ? `${params}` : ""}`);

    let activeCategory = '';
    if (query?.category) {
        activeCategory = query?.category;
    } else {
        activeCategory = 'all';
    };

    let filteredItems = [];

    if (query.search) {
        filteredItems = menuItems?.filter((items) =>
            items.name?.toLowerCase().includes(query?.search?.toLowerCase())
        );
    } else {
        filteredItems = menuItems
    };

    return (
        <div className="md:grid items-start grid-cols-10 max-w-7xl mx-auto gap-3">
            <aside className="col-span-2">
                <MenuNav activeMenu={query.category} />
            </aside>
            <div className="col-span-8">
                <div className="min-h-screen bg-tertiary dark:bg-secondary gap-3">
                    <div className="px-4 sm:px-6 lg:px-2 py-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                            <MenuHeader
                                category={activeCategory}
                            />
                            <SearchBar
                                query={query}
                            />
                        </div>

                        <FilterTags
                            query={query}
                        />

                        <MenuGrid
                            menuItems={filteredItems}
                        />
                    </div>

                    {/* <FloatingCart
                                items={cartItems}
                                total={cartTotal}
                                count={cartCount}
                                onUpdateQuantity={updateQuantity}
                            /> */}
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
