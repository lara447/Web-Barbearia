export function filterShops(shops, filters, servicesCatalog) {
  return shops.filter((shop) => {
    const query = (filters.query || '').trim().toLowerCase();
    if (
      query &&
      !shop.name.toLowerCase().includes(query) &&
      !shop.neighborhood.toLowerCase().includes(query)
    ) {
      return false;
    }

    if (filters.services && filters.services.length > 0) {
      const hasAll = filters.services.every((srvKey) => shop.services.includes(srvKey));
      if (!hasAll) return false;
    }

    if (filters.minRating && shop.rating < filters.minRating) {
      return false;
    }

    if (filters.maxPrice) {
      const prices = shop.services
        .map((key) => servicesCatalog.find((s) => s.key === key)?.price)
        .filter((p) => typeof p === 'number');
      if (prices.length > 0 && Math.min(...prices) > filters.maxPrice) {
        return false;
      }
    }

    return true;
  });
}
