import axios from 'axios';

const fetcher = async (url: string) => {
  return axios.get(url).then((response) => response.data);
}

export default fetcher;