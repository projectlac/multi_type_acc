import api from 'api/api';

export const getListGift = () => {
  return api.get(`/wheel/get-all`);
};
export const spinWheel = () => {
  return api.post(`/spin`);
};
