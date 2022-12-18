import Axios from 'axios';

const apiCloudflare = Axios.create({
  baseURL: 'https://api.cloudflare.com/client/v4',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    
  }
});

export const uploadImage = (formData:FormData) => {
  return apiCloudflare.post(`/accounts/a992b8e95ea1f85b0d9662181972b82c/images/v1`, formData, {
    headers:{
      "Authorization": "Bearer NmSZK5-VYFxtyRL-ebyi67zUcwEJZrndCFIKfNbV"
    }
  });
};
