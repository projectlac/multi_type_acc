export interface Atribute {
  size: string;
  price: number;
}
export interface IProduct {
  name: string;
  price: string;
  description: string;
  amount: number;
  images: ImageProduct[];
  id: string;
  created_at: string;
  updated_at: string;
  categories: Category[];
  slug: string;
  avatar?: string;
}
export interface ImageProduct {
  createdAt: string;
  updatedAt: string;
  url: string;
  _id: string;
}
export interface Category {
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  slug: string;
  name: string;
  id: string;
}
