export async function getTrackedStocks(stocks) {
  let trackedStocks = [];
  stocks.forEach((stock) => {
    const limit = JSON.parse(localStorage.getItem(stock.name));
    if (limit) {
      stock.minPrice = limit.minPrice;
      stock.maxPrice = limit.maxPrice;
      stock.withExpire = limit.withExpire;
      stock.expireDate = limit.expireDate;
      trackedStocks.push(stock);
    }
  });
  return trackedStocks;
}