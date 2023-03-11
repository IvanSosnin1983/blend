import axios from 'axios';

const TOKEN = '51114562faac57108ae3113fba230ec4';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export async function fetchMovies(page) {
  return await axios('trending/movie/day', {
    params: {
      api_key: TOKEN,
      page,
    },
  });
}
