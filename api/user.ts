import { IRoleData } from 'model/user';
import api from './api';

export const getUser = () => {
  return api.get('/auth/profile');
};
export const upRole= (id:number,param:IRoleData) =>{
  return api.patch(`/user-manager/set-role/${id}`,param)
}