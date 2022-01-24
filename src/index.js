import './css/styles.css';
//import { fetchPictures } from './fetchPictures';
import PicturesApiService from './fetchPictures';
const axios = require('axios');
import Notiflix from 'notiflix';
import picturesTpl from './templates/pictures.hbs';
import SimpleLightbox from 'simplelightbox';

const refs = {
  searchForm: document.querySelector('#search-form'),
  submitBtn: document.querySelector('button'),
  picturesContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const picturesApiService = new PicturesApiService();

refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmit(event) {
  event.preventDefault();
  clearPicturesMarkup();
  picturesApiService.searchQuery = event.currentTarget.elements.searchQuery.value;
  picturesApiService.resetPage();

  picturesApiService
    .fetchPictures()
    .then(renderPicturesMarkup)
    .then(totalHits => Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`))
    .catch(error => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    });

  // try {
  //   //picturesApiService.fetchPictures();
  //   if (picturesApiService.searchQuery) {
  //     picturesApiService.fetchPictures().then(renderPicturesMarkup);
  //   }
  // } catch (error) {
  //   console.log(error);
  //   Notiflix.Notify.failure(
  //     'Sorry, there are no images matching your search query. Please try again.',
  //   );
  // }

  // fetchPictures(searchQuery)
  //   .then(console.log)
  //   .catch(error => console.log(error));
}

function onLoadMore() {
  picturesApiService.fetchPictures().then(renderPicturesMarkup);
}

function renderPicturesMarkup(hits) {
  //   const markup = data
  //     .map(pic => {
  //       return `<div class="photo-card">
  //   <img src="${pic.webformatURL}" alt="${pic.tags}" loading="lazy" />
  //   <div class="info">
  //     <p class="info-item">
  //       <b>Likes</b>${pic.likes}
  //     </p>
  //     <p class="info-item">
  //       <b>Views</b>${pic.views}
  //     </p>
  //     <p class="info-item">
  //       <b>Comments</b>${pic.comments}
  //     </p>
  //     <p class="info-item">
  //       <b>Downloads</b>${pic.downloads}
  //     </p>
  //   </div>
  // </div>
  //         `;
  //     })
  //     .join('');
  //   refs.picturesContainer.insertAdjacentHTML('beforeend', markup);
  refs.picturesContainer.insertAdjacentHTML('beforeend', picturesTpl(hits));
}

function clearPicturesMarkup() {
  refs.picturesContainer.innerHTML = '';
}
