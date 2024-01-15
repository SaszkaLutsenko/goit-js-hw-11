'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('#input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
loader.style.display = 'none';

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = input.value.trim();
  gallery.innerHTML = '';
  input.value = '';
  loader.style.display = 'block';

  // object iterator
  const searchParams = new URLSearchParams({
    key: '41777094-15d23fa072ac8c02efe5e3565',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  fetch(`https://pixabay.com/api/?${searchParams}`)
    .then(response => {
      // loader.style.display = 'none';
      if (!response.ok) {
        throw new Error(response.status);
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        throw new Error('Invalid server response');
      }
    })
    .then(data => {
      loader.style.display = 'none';

      if (!data.hits || !data.hits.length) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          theme: 'dark',
          backgroundColor: '#EF4040',
          titleColor: 'white',
          messageSize: '16',
          titleSize: '16',
          position: 'topRight',
          maxWidth: 430,
        });
      } else {
        const imgs = data.hits.reduce(
          (
            html,
            {
              webformatURL,
              largeImageURL,
              tags,
              likes,
              views,
              comments,
              downloads,
            }
          ) =>
            html +
            `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
           <img class="gallery-image"
           src="${webformatURL}"
           alt="${tags}"
           />
          </a>          
          <div class="description">
          <p>Likes:<span>${likes}</span></p>
          <p>Views:<span>${views}</span></p>
          <p>Comments:<span>${comments}</span></p>
          <p>Downloads:<span>${downloads}</span></p>
          </div> 
        </li>`,
          ''
        );

        gallery.innerHTML = imgs;

        let modal = new simpleLightbox('ul.gallery a', {
          captionDelay: 250,
          captionsData: 'alt',
        });

        modal.refresh();
      }
    })
    .catch(err => {
      loader.style.display = 'none';
      console.log(err);
    });
});