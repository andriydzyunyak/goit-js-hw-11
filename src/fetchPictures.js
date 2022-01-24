const axios = require('axios');

const API_KEY = '25368021-46c08c6e665d77f3b0c6d9195';

export class PicturesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }
  async getPictures(searchQuery, page) {
    try {
      const options = `key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;
      const url = `https://pixabay.com/api/?${options}&page=${this.page}&per_page=${this.perPage}`;
      const response = await axios.get(url);
      this.incrementPage();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  get query() {
    return this.searchQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
