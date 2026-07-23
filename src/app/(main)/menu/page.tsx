import FilterTags from "@/components/pages/Menu/FilterTags";
import MenuGrid from "@/components/pages/Menu/MenuGrid";
import MenuHeader from "@/components/pages/Menu/MenuHeader";
import MenuNav from "@/components/pages/Menu/MenuNav";
import SearchBar from "@/components/pages/Menu/SearchBar";
import { getDataByQueryParams } from "@/lib/api/getData";
import { MenuItem, MenuPageProps } from "@/types/MenuPage";

const getFirst = (value: string | string[] | undefined): string => {
    if (Array.isArray(value)) return value[0] ?? '';
    return value ?? '';
};

const MenuPage = async ({ searchParams }: MenuPageProps) => {
    const query = await searchParams;
    const params = new URLSearchParams(query as Record<string, string>);

    params.delete("search");
    const response = await getDataByQueryParams<MenuItem[]>(`/api/v1/get/menu/query?${params.toString() ? `${params}` : ""}`);

    const activeCategory = getFirst(query?.category) || 'all';

    const searchValue = getFirst(query.search);
    let filteredItems: MenuItem[] = [];

    if (searchValue) {
        filteredItems = (response.data ?? []).filter((item) =>
            item.name?.toLowerCase().includes(searchValue.toLowerCase())
        );
    } else {
        filteredItems = response.data ?? [];
    };

    return (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3">
            <MenuNav activeMenu={activeCategory} />
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
