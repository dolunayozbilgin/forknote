export const createRestaurant = (data) => ({
  id: crypto.randomUUID(),
  name: data.name,
  city: data.city,
  cuisine: data.cuisine,
  price: data.price,
  status: data.status,
  rating: data.rating ? Number(data.rating) : null,
  note: data.note || "",
  visitDate: data.visitDate || "",
  createdAt: new Date().toISOString(),
});