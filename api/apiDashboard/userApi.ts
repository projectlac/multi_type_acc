import api from 'api/api';

// const checkCall = (key, param) => {
//   if (param) return `${key}=${param}`;
//   else return '';
// };

export const getRemainingMoney = () => {
  return api.get(`/statistical/account-remaining`);
};
