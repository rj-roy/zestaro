'use server';

export async function handleAddToCart(prevState, formData) {
  const productId = formData.get('productId');

  // Add to cart logic here
  console.log(formData, 'kdlfjsiojl');

  // await db.cart.insertOne({ productId });

  return {
    added: true,
  };
}