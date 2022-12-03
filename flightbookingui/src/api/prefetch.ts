import axios from '../urlConfig/axios';
const prefetch = async () => {
  return axios.get('/prefetch').then((res) => {
    return res.data;
  });
};
export default prefetch;
