export interface MenuItem {
    imageUrl: string;
    _id?: string;
    name?: string;
    description?: string;
    category?: string;
    price?: number;
    image?: string;
    dietaryTags?: string[];
};

export type SearchParams = Record<string, string | string[] | undefined>;

export interface MenuPageProps {
  searchParams: Promise<SearchParams>;
}

export interface CartItemType {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}