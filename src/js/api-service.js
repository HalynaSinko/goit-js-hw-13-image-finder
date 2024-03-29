const API_KEY = '22026737-4ace7165bbd581938b49ded93';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImgsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
     const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=12`;

    return fetch(url)
      .then(response => response.json())
      .then(({hits}) => {
        // console.log(data)
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

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}