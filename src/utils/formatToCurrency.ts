export const formatToCurrency = (val: number) => {
  const usFormat = {
    style: "currency",
    currency: "USD",
  };

  return val.toLocaleString("en-US", usFormat);
};
