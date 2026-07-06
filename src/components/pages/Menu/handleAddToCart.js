'use server';

import { userSession } from "@/lib/core/session";

export async function handleAddToCart(prevState, formData) {
  const session = await userSession();
  const productId = formData.get('productId');
  console.log(prevState, "prevstate");

  // Add to cart logic here
  console.log(formData, 'kdlfjsiojl');

  // await db.cart.insertOne({ productId });

  return {
    added: true,
  };
};