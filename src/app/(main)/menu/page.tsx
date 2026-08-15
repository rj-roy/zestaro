import FilterTags from "@/components/pages/Menu/FilterTags";
import MenuGrid from "@/components/pages/Menu/MenuGrid";
import MenuHeader from "@/components/pages/Menu/MenuHeader";
import MenuNav from "@/components/pages/Menu/MenuNav";
import PagePagination from "@/components/pages/Menu/PagePagination";
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
    const headers = response?.headers;

    const totalCount = parseInt(headers?.get("X-Total-Count") ?? "0", 10);
    const totalPages = parseInt(headers?.get("X-Total-Pages") ?? "1", 10);
    const currentPage = parseInt(headers?.get("X-Current-Page") ?? "1", 10);

    const paginationParams: Record<string, string> = {};
    if (query) {
        for (const [key, value] of Object.entries(query as Record<string, string>)) {
            if (key !== 'page') paginationParams[key] = value;
        }
    }

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
        <div className="mx-auto grid max-w-full grid-cols-1 gap-3">
            <MenuNav activeMenu={activeCategory} />
            <div className="min-w-0 min-h-screen bg-wh-p dark:bg-bl-p gap-3 px-4 sm:px-6 lg:px-2 py-8">
                <div className="flex flex-col lg:flex-row items-center lg:justify-between bg-wh-s dark:bg-bl-p mx-3 p-3 gap-4 mb-15">
                    {/* <MenuHeader category={activeCategory} /> */}
                    <FilterTags query={query} />
                    <SearchBar query={query} />
                </div>
                <MenuGrid menuItems={filteredItems} />
                <div>
                    <PagePagination currentPage={currentPage} totalPages={totalPages} searchParams={paginationParams} />
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
