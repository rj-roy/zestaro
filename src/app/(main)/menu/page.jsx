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
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3">
            <MenuNav activeMenu={query.category} />
            <div className="min-w-0 min-h-screen bg-tertiary dark:bg-secondary gap-3 px-4 sm:px-6 lg:px-2 py-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                    <MenuHeader category={activeCategory} />
                    <SearchBar query={query} />
                </div>
                <FilterTags query={query} />
                <MenuGrid menuItems={filteredItems} />
            </div>
        </div>
    );
};

export default MenuPage;
