import { ITag } from './item';

export interface IAccountVipAdmin {
  code: string;
  id: number;
  username: string;
  password: string;
  price: string;
  created_at: string;
  user: any;
  is_sold: boolean;
  is_hidden: boolean;
  description: string;
  name: string;
  slug: string;
  updated_at?: string;
  type?: string;
  sold_at?: string;
}
export interface IAccountShop {
  name: string;
  slug: string;
  avatar: string;
  price: string;
  code: string;
  description: string;
  is_sold: boolean;
  server?: string;
  ar_level?: string;
  heroes?: ITag[];
  weapons?: ITag[];
  price_after_sale?: string;
  sale?: number;
}
