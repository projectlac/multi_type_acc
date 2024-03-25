import api from 'api/api';

export const setDescVIP = (description: string) => {
  return api.patch(`/account/set-description-by-admin`, {
    type: 'VIP',
    description
  });
};
export const setDescRERUN = (description: string) => {
  return api.patch(`/account/set-description-by-admin`, {
    type: 'REROLL',
    description
  });
};
export const setDescRANDOM = (description: string) => {
  return api.patch(`/account/set-description-by-admin`, {
    type: 'RANDOM',
    description
  });
};
export const setDescNEW = (description: string) => {
  return api.patch(`/account/set-description-by-admin`, {
    type: 'NEW',
    description
  });
};

export const updateMomo = (phone: string, token: string) => {
  return api.patch('/information/update-info-momo', { phone, token });
};
