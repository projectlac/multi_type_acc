import api from 'api/api';

const checkCall = (key, param) => {
  if (param) return `${key}=${param}`;
  else return '';
};

export const getWeapon = (limit?: number, game?:string) => {
  return api.get(`/weapon?${checkCall('limit', limit)}&${checkCall('game', game)}`);
};

export const getHero = (limit?: number,game?:string) => {
  return api.get(`/hero?${checkCall('limit', limit)}&${checkCall('game', game)}`);
};
export const createWeapon = (data: FormData) => {
  return api.post(`/weapon/create`, data);
};

export const createHero = (data: FormData) => {
  return api.post(`/hero/create`, data);
};

export const editWeapon = (slug: string, data: FormData) => {
  return api.put(`/weapon/update/${slug}`, data);
};

export const editHero = (slug: string, data: FormData) => {
  return api.put(`/hero/update/${slug}`, data);
};

export const getWeaponBySlug = (slug: string) => {
  return api.get(`/weapon/${slug}`);
};

export const getHeroBySlug = (slug: string) => {
  return api.get(`/hero/${slug}`);
};
export const deleteWeapon = (slug: string) => {
  return api.patch(`/weapon/delete/${slug}`);
};

export const deleteHero = (slug: string) => {
  return api.patch(`/hero/delete/${slug}`);
};

export const createTagCode = (param:FormData)=>{
  return api.post(`/value-set/create`, param)
} 
export const updateTagCode = (slug:string , param:FormData)=>{
  return api.put(`/value-set/update/${slug}`, param)
} 
export const deleteTagCode = (slug:string)=>{
  return api.patch(`/value-set/delete/${slug}`)
} 
export const getTagCodeBySlug= (slug:string)=>{
  return api.get(`/value-set/${slug}`);
}
export const getListTagCode = ()=>{
  return api.get(`/value-set?type=TAGCODE&limit=999&offset=0`)
}