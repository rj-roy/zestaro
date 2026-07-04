import MenuNav from "@/components/pages/Menu/MenuNav";
import { getDataByCollection, getDataByQueryParams } from "@/lib/api/getData";

const MenuPage = async ({searchParams}) => {
    const query = await searchParams;

    const menu = await getDataByCollection('/api/v1/get/menu/all')
    const qq = await getDataByQueryParams(`/api/v1/get/menu/query?category=${query.category}`)
    console.log(qq);
    return (
        <div>
            <MenuNav/>
        </div>
    );
};

export default MenuPage;