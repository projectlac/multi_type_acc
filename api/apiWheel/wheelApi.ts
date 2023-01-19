import api from 'api/api';

export const getListGift = () => {
  return api.get(`/wheel/get-all`);
};
export const getOneGift = (slug: string) => {
  return api.get(`/wheel/get-one/${slug}`);
};
export const spinWheel = () => {
  return api.post(`/spin`);
};

export const getListGiftById = () => {
  return api.get(`/wheel/get-all-by-admin`);
};
export const getOneGiftById = (slug: string) => {
  return api.get(`/wheel/get-one-by-admin/${slug}`);
};
