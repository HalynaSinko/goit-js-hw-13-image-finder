import cardsTpls from '../template/cardsTpls.hbs';
import ImgsApiService from './api-service';

import LoadMoreBtn from './load-more-btn'
import { onFetchError, onFetchSuccess } from './notification';
import { onGalleryClick } from './basicLightbox'

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.js-gallery'),
  hiddenElement: document.getElementById('scroll-container'),
  scrollUp: document.querySelector('.js-scroll-up'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imgsApiService = new ImgsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);
refs.gallery.addEventListener('click', onGalleryClick);
refs.scrollUp.addEventListener('click', smoothScrollUp);

function onSearch(e) {
  e.preventDefault();

  imgsApiService.query = e.currentTarget.elements.query.value;
  
  loadMoreBtn.show();
  imgsApiService.resetPage();
  clearGallery();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  imgsApiService.fetchImages().then(hits => {
    // console.log(hits);
    if (hits.length === 0) {
        loadMoreBtn.hide();
        onFetchError("Don't found any matches. Please change query.");
        return;
    }
    if (hits.length > 0 && hits.length < 12) {
        onFetchSuccess(`Found only ${hits.length} matches.`);
        loadMoreBtn.hide();
        refs.hiddenElement.textContent = 'The end.';
    }
      if (hits.length === 12) {
        loadMoreBtn.enable();
        onFetchSuccess('Found many matches.');
        refs.scrollUp.classList.remove('is-hidden');
      }
      
    appendCardsMarkup(hits);
    smoothScrollDown();
  });
}

function appendCardsMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', cardsTpls(hits));
}

function clearGallery() {
    refs.gallery.innerHTML = '';
    refs.hiddenElement.textContent = '';
}

function smoothScrollDown() {
    refs.hiddenElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
}

function smoothScrollUp() {
  refs.searchForm.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
  refs.scrollUp.classList.add('is-hidden');
}