export const originalDateTimeString = (value) => {
  const originalDateTime = new Date(value);
  const options = { timeZone: "Asia/Kolkata" };
  return originalDateTime.toLocaleString("en-US", options);
};

export const numberFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

export const calculateRemainingBalance = (transactions, currentTransaction) => {
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.createdAt <= currentTransaction.createdAt
  );

  const totalAmount = filteredTransactions.reduce((total, transaction) => {
    if (transaction.type === "cashIn") {
      return total + transaction.amount;
    } else {
      return total - transaction.amount;
    }
  }, 0);
  return totalAmount;
};
