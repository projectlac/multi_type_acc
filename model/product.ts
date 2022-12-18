export interface Atribute {
  size: string;
  price: number;
}
export interface IProduct {
  name: string;
  detail: Atribute[];
  description: string;
  amount: number;
  images:ImageProduct[];
  _id:string;
  createdAt:string;
  categories:Category[];
  slug:string
}
export interface ImageProduct {
  createdAt: string;
  updatedAt: string;
  url: string;
  _id: string
}
export interface Category {
  created_at: string;
  updated_at: string;
  is_deleted:boolean;
  slug: string;
  name: string;
  id: string
}


