export async function getStocks() {
  return await fetch(process.env.REACT_APP_URL)
  .then((res) => res.json())
  .catch(() => ({
    error: 'Unable to connect to server. Please try again'
  }));
}