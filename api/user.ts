import { IHistoryCheckParams, IRoleData } from 'model/user';
import api from './api';

export const getUser = () => {
  return api.get('/auth/profile');
};
export const upRole = (id: number, param: IRoleData) => {
  return api.patch(`/user-manager/set-role/${id}`, param);
};
export const changeMoney = (id: number, param: string) => {
  return api.patch(`/user-manager/set-money/${id}`, { money: param });
};

export const getHistory = () => {
  return api.get(`/history/buy-account?limit=999`);
};

export const getHistoryByAdmin2 = (param: IHistoryCheckParams) => {
  return api.get(`/history/get-by-check?limit=${param.limit}&offset=${param.offset}&keyword=${param.keyword}&type=${param.type}`);
};
