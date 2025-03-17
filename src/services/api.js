import axios from 'axios';

const API_Key = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.unsplash.com/search/photos';

const fetchImages = async (query, page) => {
  const response = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Client-ID ${API_Key}`,
    },
    params: {
      query,
      orientation: 'portrait',
      // color: 'red',
      page,
      per_page: 9,
    },
  });
  return response.data;
};

export default fetchImages;
