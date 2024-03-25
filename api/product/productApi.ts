import api from 'api/api';
import { ISaleType } from 'model/product';

export const addProduct = (formdata: FormData) => {
  return api.post(`/product/create`, formdata);
};

export const deleteProduct = (slug: string) => {
  return api.delete(`/Product/delete/${slug}`);
};

export const updateProduct = (slug: string, formdata: FormData) => {
  return api.put(`/Product/update/${slug}`, formdata);
};
export const getProductBySlug = (slug: string) => {
  return api.get(`/Product/${slug}`);
};
export const getProduct = (limit: number, offset: number) => {
  return api.get(`/Product?limit=${limit}&offset=${offset}`);
};
export const getProductInShop = (
  limit: number,
  offset: number,
  category: string,
  sortPrice: string
) => {
  return api.get(
    `/Product?limit=${limit}&offset=${offset}&sortCreatedAt=true&category=${category}${
      sortPrice !== '' ? `&sortPriceAfterSale=${sortPrice} ` : ''
    }`
  );
};
export const getProductNew = (limit: number, offset: number) => {
  return api.get(`/Product?limit=${limit}&offset=${offset}&sortCreatedAt=true`);
};
export const getProductSale = (limit: number, offset: number) => {
  return api.get(`/Product?limit=${limit}&offset=${offset}`);
};
export const getProductHot = (limit: number, offset: number) => {
  return api.get(`/Product?limit=${limit}&offset=${offset}`);
};
export const buyProduct = (
  receiver: string,
  delivery_address: string,
  phone: string,
  description: string,
  details: any
) => {
  return api.post(`/order/create`, {
    receiver,
    delivery_address,
    phone,
    description,
    details
  });
};

export const queryAllProductForSiteMap = () => {
  return api.get(`/Product?limit=9999&offset=0`);
};
//////////////////////////////////

export const getOrder = () => {
  return api.get(`/order?limit=9999&type=Mua mô hình`);
};
export const updateOrderStart = (id: number, status: string) => {
  return api.put(`/order/update/${id}`, { status: status });
};

export const saleType = (params: ISaleType) => {
  return api.patch(`/account/set-sale-multi`, params);
};
