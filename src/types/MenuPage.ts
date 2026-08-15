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
  itemId: string;
  itemName: string;
  itemPrice: number;
  itemDesc?: string;
  imageUrl?: string;
  quantity: number;
}

export type CartCountData = {
  cartLength: number;
  totalPrice: number;
}

// export interface CartItemsData {
//   cartItems: CartItemType[];
//   cartItemIds: string[];
// };

export interface CartContextValue {
  cartItems: CartItemType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  cartCount: CartCountData;
  syncGuest: () => void;
  syncDeriveCount: () => void;
  syncItems: (image?: boolean) => void;
  pushLocalToDb: () => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeItem: (itemId: string) => void;
};