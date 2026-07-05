import MenuNav from "@/components/pages/Menu/MenuNav";
import MenuRoot from "@/components/pages/Menu/MenuRoot";
import { getDataByQueryParams } from "@/lib/api/getData";

const MenuPage = async ({ searchParams }) => {
    const query = await searchParams;
    const params = new URLSearchParams(query);
    params.delete("search");
    const menuItems = await getDataByQueryParams(`/api/v1/get/menu/query?${params.toString() ? `${params}` : ""}`)
    return (
        <div className="grid grid-cols-10 max-w-7xl mx-auto gap-3">
            <div className="col-span-2">
                <MenuNav activeMenu={query.category} />
            </div>
            <div className="col-span-8">
                <MenuRoot
                    query={query}
                    menuItems={menuItems}
                />
            </div>
        </div>
    );
};

export default MenuPage;
