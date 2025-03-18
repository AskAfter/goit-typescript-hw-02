import axios from 'axios';
import { Image } from '../types';

const API_Key: string = import.meta.env.VITE_API_KEY;
const BASE_URL: string = 'https://api.unsplash.com/search/photos';

interface Response {
  results: Image[];
  total: number;
  total_pages: number;
}

const fetchImages = async (query: string, page: number): Promise<Response> => {
  const response = await axios.get<Response>(BASE_URL, {
    headers: {
      Authorization: `Client-ID ${API_Key}`,
    },
    params: {
      query,
      orientation: 'portrait',
      page,
      per_page: 9,
    },
  });
  return response.data;
};

export default fetchImages;
