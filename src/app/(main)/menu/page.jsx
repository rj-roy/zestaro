import MenuNav from "@/components/pages/Menu/MenuNav";
import MenuRoot from "@/components/pages/Menu/MenuRoot";
import { getDataByCollection, getDataByQueryParams } from "@/lib/api/getData";

const MenuPage = async ({ searchParams }) => {
    const query = await searchParams;

    const allMenu = await getDataByCollection('/api/v1/get/menu/all')
    const queryMenu = await getDataByQueryParams(`/api/v1/get/menu/query?category=${query.category}`)
    return (
        <div className="grid grid-cols-10 max-w-7xl mx-auto gap-3">
            <div className="col-span-2">
                <MenuNav />
            </div>
            <div className="col-span-8">
                <MenuRoot
                    allMenu={allMenu}
                    queryMenu={queryMenu}
                />
            </div>
        </div>
    );
};

export default MenuPage;
