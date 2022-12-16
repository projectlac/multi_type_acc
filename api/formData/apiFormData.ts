import Axios from 'axios';

const apiFormData = Axios.create({
  baseURL: 'http://localhost:4200/',
  headers: {
    Accept: '*/*',
    'Content-Type': 'multipart/form-data'
  }
});

export default apiFormData;
