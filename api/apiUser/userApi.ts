import api from 'api/api';

const checkCall = (key, param) => {
  if (param) return `${key}=${param}`;
  else return '';
};

export const getListUser = (limit?: number, offset?:number, search?:string) => {
  return api.get(`/user-manager?${checkCall('limit', limit)}&${checkCall('offset', offset)}&${checkCall('key', search)}`);
};

export const getCode = (bank: string, token: string) => {
  return api.post(`/action-cronjob`, { bank: bank, token });
};

export const topUpWithCard = (
  telco: string,
  amount: number,
  serial: string,
  code: string,
  token: string
) => {
  return api.post(`/action-cronjob/top-up`, {
    telco,
    amount,
    serial,
    code,
    is_fast: 1,
    token
  });
};

export const checkToken = (token: string) => {
  return api.get(`/action-cronjob/check-captcha/${token}`);
};

export const getNotification = (limit: number, offset: number) => {
  return api.get(`/history/bonus?limit=${limit}&offset=${offset}`);
};
export const get500PaymentHistory = (limit: number) => {
  return api.get(`/history/bank-transfer?limit=${limit}`);
};

export const get500Transacions = (id?: string, username?: string) => {
  return api.get(
    `/transactions?limit=500&offset=0&id=${id}&username=${username}&transaction_type=Nạp tiền tài khoản`
  );
};
