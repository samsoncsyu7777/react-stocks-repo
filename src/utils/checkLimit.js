export async function checkLimit(trackedStocks) {
  let result = {}
  for (let i = 0; i < trackedStocks.length; i++) {
    const stock = trackedStocks[i];
    const expireDate = new Date(Date.parse(stock.expireDate)).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    if ((stock.withExpire && expireDate > today) || !stock.withExpire) {
      if (stock.price > stock.maxPrice) {
        result = { stock: stock, event: ['Rising', 'rose above'] };
        break;
      } else if (stock.price < stock.minPrice) {
        result = { stock: stock, event: ['Falling', 'fell below'] };
        break;
      }
    }
  }
  return result;
}
