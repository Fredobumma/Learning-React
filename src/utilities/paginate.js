export function paginate(items, currentPage, pageSize) {
  const startNumber = (currentPage - 1) * pageSize;

  return items.slice(startNumber, startNumber + pageSize);
}

export function autoPaginate(items, currentPage, pageSize) {
  return currentPage > 1 && items.length % pageSize === 0
    ? currentPage - 1
    : currentPage;
}
