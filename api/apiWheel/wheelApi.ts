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
export const updateGiftById = (slug: string, data: FormData) => {
  return api.put(`/wheel/update/${slug}`, data);
};
export const spinWheelHistory = () => {
  return api.get(`/spin/history?limit=50`);
};
export const spinWheelHistoryAdmin = () => {
  return api.get(`/gift?limit=99999`);
};
export const updateStatusWheel = (id:number, is_receive:boolean) => {
  return api.put(`/gift/update/${id}`,{is_receive});
};
export const getSpinLastest = () => {
  return api.get(`/spin/latest-spin/`);
};
export const getUnreceivedGift = () => {
  return api.get(`/gift?limit=999&is_receive=false`);
};
export const orderGiftInLuckySpin = (
  receiver: string,
  delivery_address: string,
  phone: string,
  description: string,
  gift: number[]
) => {
  return api.post(`/order/create-gift`, {
    receiver,
    delivery_address,
    phone,
    description,
    gift
  });
};


export const getOrderGift = () => {
  return api.get(`/order?limit=9999&type=Đổi thưởng`);
};
export const changeStatusOrder = (id:number, status:string) =>{
return api.put(`order/update/${id}`,{status})
}