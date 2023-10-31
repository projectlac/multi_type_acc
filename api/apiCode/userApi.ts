import api from 'api/api';

// const checkCall = (key, param) => {
//   if (param) return `${key}=${param}`;
//   else return '';
// };


export const uploadMultiCode = (fd: FormData) => {
  return api.post(`/account/bulk-insert-code`, fd);
};
