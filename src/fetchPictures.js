const API_KEY = '25368021-46c08c6e665d77f3b0c6d9195';

export default class PicturesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPictures() {
    //console.log(this);
    //   const options = {
    //     headers: {
    //       key: '25368021-46c08c6e665d77f3b0c6d9195',
    //     },
    //     };

    const options = `key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;
    const url = `https://pixabay.com/api/?${options}&page=${this.page}&per_page=40`;
    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
