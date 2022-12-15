import Axios from 'axios';

const api = Axios.create({
  baseURL: 'https://www.cloudflare.com/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export const getIP = () => {
  return api.get(`cdn-cgi/trace`);
};
