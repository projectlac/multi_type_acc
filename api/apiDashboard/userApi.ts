import api from 'api/api';

// const checkCall = (key, param) => {
//   if (param) return `${key}=${param}`;
//   else return '';
// };

export const getRemainingMoney = () => {
  return api.get(`/statistical/account-remaining`);
};
export const getMoneyTable = (from: string, to: string, currency: string) => {
  return api.post(`/statistical/show-by-month`, {
    from,
    to,
    transaction_type: currency
  });
};
