export function sortStock(stocks, field, order) {
  return stocks.sort((a, b) => compare(a, b, field, order));
}

function compare(a, b, field, order) {
  const index = order === 'ascending' ? 1 : -1;
  if (a[field] < b[field]) {
    return -1 * index;
  } else if (a[field] > b[field]) {
    return index;
  } else {
    return 0;
  }
}