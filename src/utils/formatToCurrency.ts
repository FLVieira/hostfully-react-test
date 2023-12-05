export const formatToCurrency = (val: number) => {
  return val.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
