'use server';
import { serverMutation } from "@/lib/core/server";
import { userSession } from "@/lib/core/session";
import { userTypes } from "@/types/userTypes";

export interface CartActionState {
  added: boolean;
}

export async function handleAddToCart(prevState: CartActionState, formData: FormData): Promise<CartActionState> {
  const session = await userSession();
  const { id, name } = session?.user as userTypes;

  const checkedItem = formData.get('checkedItem');
  const localCart = formData.get('localCart')
  const data = { userId: id, userName: name, checkedItem: checkedItem, localCart }

  const createCart = await serverMutation('/api/v1/cart/create', data, 'POST')
  
  if (!createCart.success) {
    return { added: false };
  };

  return { added: true };
};
