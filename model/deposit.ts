export interface IDepositCreate {
  uuid: string;
  username: string;
  password: string;
  server: string;
  name: string;
  phone: string;
  pack: number;
  note?: string;
}
export type IStatus = 'PEDDING' | 'SUCCESS' | 'ERROR';
export interface IGetDeposit {
  id: number;
  uuid: string;
  username: string;
  password: string;
  server: string;
  name: string;
  phone: string;
  pack: number;
  note?: string;
  status: IStatus;
  created_at: string;
  transaction:any
}

export interface IOrder {
  id:string,
  receiver: string;
  delivery_address: string;
  description: string;
  details:IDetailOrder[];
  phone:string;
  status:IStatus;
  total:string;
  created_at: string;
}
export interface IDetailOrder {
  amount: number;
  id: number;
  price: string;
  product:IGift
}
export interface IGift {
  name:string,
  price:string
}
