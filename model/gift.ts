import { IStatus } from "./deposit";

export  interface IOrderGift{
    id: string;
    receiver: string;
    delivery_address: string;
    description: string;
    details: IDetailOrder[];
    phone: string;
    status: IStatus;
    total: string;
    created_at: string;
    user:IUser
}

export  interface IUser{
    id: number;
    username: string;
    email: string;
 
}
export interface IDetailOrder {
    amount: number;
    id: number;
    price: string;
    gift:IGift
  }
  export interface IGift{
    amount:number;
    wheel:IGiftDetail
  }
  export interface IGiftDetail{
    name:string
  }