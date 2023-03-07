import { ILogin, IRegis, IResetPassword } from 'model/form';
import api from './api';

export const signIn = (data: ILogin) => {
  return api.post('/auth/sign-in', data);
};
export const signUp = (data: IRegis) => {
  return api.post('/auth/sign-up', data);
};

export const forgotPassword = (data: string) => {
  return api.post(`/auth/forget-password?email=${data}`);
};
export const changePassword = (param: IResetPassword) => {
  const { token, ...result } = param;
  return api.post(`/auth/reset-password/${token}`, result);
};

export const getWebInformation = () => {
  return api.get(`/information`)
}
export const updateWebInformation = (youtube:string,description:string) => {
  return api.put(`/information/update`,{youtube, description})
}
export const updatePriceSpin = (price:number) => {
  return api.put(`/information/update`,{spinning_price:price})
}