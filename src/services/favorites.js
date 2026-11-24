export function toggleFavoriteId(favorites, shopId) {
  const id = Number(shopId);
  return favorites.includes(id)
    ? favorites.filter((item) => item !== id)
    : [...favorites, id];
}
