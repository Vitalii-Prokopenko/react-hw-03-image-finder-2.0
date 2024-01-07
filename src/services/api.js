import axios from 'axios';

const API_KEY = '30578820-1c894d3db344c99ef40fa5cf7';

axios.defaults.baseURL = 'https://pixabay.com/api/';

axios.defaults.params = {
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchImages = async (searchTag, page) => {
  const { data } = await axios.get(
    `?q=${searchTag}&key=${API_KEY}&page=${page}`
  );
  return data;
};

const api = {
  fetchImages,
};

export default api;
