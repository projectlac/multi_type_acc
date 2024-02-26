import api from 'api/api';
import apiFormData from 'api/formData/apiFormData';
import {
  IAccountVip,
  IQueryCode,
  IQueryRandomAcc,
  IQueryVipAcc
} from 'model/form';

interface IParamUpdateHidden {
  slug: string;
  isHidden: boolean;
}

const checkCall = (key, param) => {
  if (param) return `&${key}=${param}`;
  else return '';
};
const checkBool = (key, param) => {
  if (param !== '') return `&${key}=${param}`;
  else return '';
};
const checkCallPriceSort = (key, param) => {
  if (param !== undefined) return `&${key}=${param}`;
  else return '';
};
export const createAccountVip = (data: FormData) => {
  return apiFormData.post('/account/create-account-vip', data);
};

export const getAccountVipFromDashboard = (param: IAccountVip) => {
  return apiFormData.get(
    `/account/get-accounts-by-admin?type=VIP&limit=${param.limit}&offset=${
      param.offset
    }&priceSort=${param.priceSort}${checkCall('hero', param.hero)}${checkCall(
      'server',
      param.server
    )}${checkCall('weapon', param.weapon)}${checkCall(
      'keyword',
      param.keyword
    )}${checkCall('is_sold', param.is_sold)}${checkCall(
      'is_hidden',
      param.is_hidden
    )}${checkCall('sold_date', param.sold_date)}${checkCall(
      'game',
      param.game
    )}`
  );
};
export const getAccountBySlugToManager = (slug: string) => {
  return apiFormData.get(`/account/get-account-to-manager/${slug}`);
};
export const getAccountBySlug = (slug: string) => {
  return apiFormData.get(`/account/${slug}`);
};
export const editAccountVip = (slug: string, formData: FormData) => {
  return apiFormData.put(`account/update-account-vip/${slug}`, formData);
};
export const deleteAccount = (slug: string) => {
  return apiFormData.delete(`account/delete/${slug}`);
};
export const updateHiddenAccount = (params: IParamUpdateHidden) => {
  return api.patch(
    `account/update-hidden?slug=${params.slug}&isHidden=${params.isHidden}`
  );
};

export const createMultiAccount = (data: FormData) => {
  return apiFormData.post('/account/bulk-create-account', data);
};

export const createAccountNomal = (data: FormData) => {
  return apiFormData.post('/account/create-account', data);
};

export const updateAccountNomal = (slug: string, data: FormData) => {
  return apiFormData.put(`/account/update-account/${slug}`, data);
};

export const getAccountNomalFromDashboard = (
  limit: number,
  offset: number,
  game: string,
  search?: string,
  is_sold?: boolean | ''
) => {
  return apiFormData.get(
    `/account/get-accounts-by-admin?type=REROLL,RANDOM&limit=${limit}&offset=${offset}&game=${game}${checkCall(
      'keyword',
      search
    )}${checkBool('is_sold', is_sold)}`
  );
};

export const queryRandomAccount = (param: IQueryRandomAcc) => {
  return apiFormData.get(
    `/account/get-accounts?type=RANDOM&limit=${param.limit}&offset=${
      param.offset
    }${checkCallPriceSort('priceSort', param.priceSort)}${checkCall(
      'keyword',
      param.keyword
    )}${checkCall('ar', param.ar)}${checkCall(
      'rangeMoney',
      param.rangeMoney
    )}${checkCall('game', param.game)}`
  );
};
export const queryRerollAccount = (param: IQueryRandomAcc) => {
  return apiFormData.get(
    `/account/get-accounts?type=${param.type ?? 'REROLL'}&limit=${param.limit}&offset=${
      param.offset
    }&priceSort=${param.priceSort}${checkCall(
      'keyword',
      param.keyword
    )}${checkCall('ar', param.ar)}${checkCall(
      'rangeMoney',
      param.rangeMoney
    )}${checkCall('game', param.game)}${checkCall('hero', param.hero.toString())}`
  );
};

export const queryAccountVip = (param: IQueryVipAcc) => {
  return apiFormData.get(
    `/account/get-accounts?type=VIP&is_hidden=true&limit=${
      param.limit
    }&offset=${param.offset}${checkCallPriceSort(
      'priceSort',
      param.priceSort
    )}${checkCall('code', param.keyword)}${checkCall(
      'ar',
      param.ar
    )}${checkCall('server', param.server)}${checkCall(
      'hero',
      param.hero
    )}${checkCall('weapon', param.weapon)}${checkCall(
      'rangeMoney',
      param.rangeMoney
    )}${checkCall('game', param.game)}`
  );
};

export const queryCodeGame = (param: IQueryCode) => {
  return apiFormData.get(
    `/account/get-accounts?type=CODE&limit=${param.limit}&offset=${
      param.offset
    }${checkCallPriceSort('priceSort', param.priceSort)}${checkCall(
      'code',
      param.keyword
    )}${checkCall('ar', param.ar)}${checkCall(
      'server',
      param.server
    )}${checkCall('hero', param.hero)}${checkCall(
      'weapon',
      param.weapon
    )}${checkCall('rangeMoney', param.rangeMoney)}${checkCall(
      'game',
      param.game
    )}${checkCall('tag_code', param.tag_code)}`
  );
};

export const buyAccount = (slug: string) => {
  return api.post(`/buy-account`, { slugs: [slug] });
};

// get total
export const getInfoAllAccount = () => {
  return api.get('/account');
};
export const getDepositHome = () => {
  return api.get('/deposit/get-total-deposit');
};

export const queryAllAccountForSiteMap = () => {
  return apiFormData.get(`/account/get-accounts?limit=9999&offset=0`);
};
// update 5/12

export const getAccountNewFromDashboard = (param: IAccountVip) => {
  return apiFormData.get(
    `/account/get-accounts-by-admin?type=NEW&limit=${param.limit}&offset=${
      param.offset
    }&priceSort=${param.priceSort}${checkCall('hero', param.hero)}${checkCall(
      'server',
      param.server
    )}${checkCall('weapon', param.weapon)}${checkCall(
      'keyword',
      param.keyword
    )}${checkCall('is_sold', param.is_sold)}${checkCall(
      'sold_date',
      param.sold_date
    )}${checkCall('game', param.game)}`
  );
};

export const getCodeFromDashboard = (param: IAccountVip) => {
  return apiFormData.get(
    `/account/get-accounts-by-admin?type=CODE&limit=${param.limit}&offset=${
      param.offset
    }&priceSort=${param.priceSort}${checkCall('hero', param.hero)}${checkCall(
      'server',
      param.server
    )}${checkCall('weapon', param.weapon)}${checkCall(
      'keyword',
      param.keyword
    )}${checkCall('is_sold', param.is_sold)}${checkCall(
      'sold_date',
      param.sold_date
    )}${checkCall('game', param.game)}`
  );
};

export const queryAccountNew = (param: IQueryVipAcc) => {
  return apiFormData.get(
    `/account/get-accounts?type=NEW&limit=${param.limit}&offset=${
      param.offset
    }${checkCallPriceSort('priceSort', param.priceSort)}${checkCall(
      'code',
      param.keyword
    )}${checkCall('ar', param.ar)}${checkCall(
      'server',
      param.server
    )}${checkCall('hero', param.hero)}${checkCall(
      'weapon',
      param.weapon
    )}${checkCall('rangeMoney', param.rangeMoney)}${checkCall(
      'game',
      param.game
    )}`
  );
};
