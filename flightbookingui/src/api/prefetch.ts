import axios from '../urlConfig/axios';
const prefetch = async () => {
  return axios.get('/prefetch').then((res) => {
    console.log({ res });
    return res.data;
  });
};
export default prefetch;
