import axios from '../urlConfig/axios';
const search = async (userpreferences: any) => {
  return axios.post('/search', userpreferences).then((res) => {
    return res.data;
  });
};
export default search;
