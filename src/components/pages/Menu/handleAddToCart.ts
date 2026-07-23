'use server';

import { userSession } from "@/lib/core/session";

export interface CartActionState {
  added: boolean;
}

export async function handleAddToCart(prevState: CartActionState, formData: FormData): Promise<CartActionState> {
  const session = await userSession();
  const productId = formData.get('productId') as string;

  // Add to cart logic here
  // await db.cart.insertOne({ productId });

  return {
    added: true,
  };
}
