import './css/styles.css';
import { PicturesApiService } from './fetchPictures';
import Notiflix from 'notiflix';
import picturesTpl from './templates/pictures.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  submitBtn: document.querySelector('button'),
  picturesContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionType: 'alt',
  captionDelay: 200,
  captionPosition: 'bottom',
});

let arrPic = [];

const picturesApiService = new PicturesApiService();

function onSubmit(event) {
  event.preventDefault();
  refs.loadMoreBtn.classList.add('is-hidden');
  picturesApiService.searchQuery = event.currentTarget.elements.searchQuery.value;

  if (picturesApiService.searchQuery === '') {
    clearPicturesMarkup();
  } else {
    refs.loadMoreBtn.classList.remove('is-hidden');
    clearPicturesMarkup();
    picturesApiService.resetPage();
    fetchPictures();
  }
}

async function fetchPictures() {
  try {
    arrPic = await picturesApiService.getPictures(
      picturesApiService.query,
      picturesApiService.page,
    );
    renderPicturesMarkup(arrPic);
    gallery.refresh();
    if (arrPic.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    } else {
      Notiflix.Notify.success(`Hooray! We found ${arrPic.totalHits} images.`);
    }
    if (arrPic.totalHits < picturesApiService.perPage) {
      refs.loadMoreBtn.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  if (arrPic.totalHits > picturesApiService.perPage) {
    try {
      arrPic = await picturesApiService.getPictures();
      renderPicturesMarkup(arrPic);
      refs.loadMoreBtn.classList.remove('is-hidden');
    } catch (error) {
      console.log(error);
      refs.loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
  }
}

function renderPicturesMarkup(arrPic) {
  refs.picturesContainer.insertAdjacentHTML('beforeend', picturesTpl(arrPic.hits));

  gallery.on('show.simplelightbox', function () {});
}

function clearPicturesMarkup() {
  refs.picturesContainer.innerHTML = '';
}
