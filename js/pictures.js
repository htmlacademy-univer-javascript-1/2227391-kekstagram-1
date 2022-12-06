import {openPictureModal} from './modal-picture.js';
import {randomElements} from './util.js';

const picturesListElem = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const appendPicture = (picture) => {
  const {id, url, likes, comments} = picture;

  const pictureElement = photoTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.dataset.id = id;

  picturesFragment.appendChild(pictureElement);
};

const renderPictures = (pictures, filter) => {
  document.querySelectorAll('.picture').forEach((picture) => picture.remove() );
  if (filter === 'filter-default') {
    pictures.forEach((picture) => {
      appendPicture(picture);
    });
  } else if (filter === 'filter-random') {
    randomElements(10, pictures).forEach((picture) => {
      appendPicture(picture);
    });
  } else {
    const picturesSorted =  Array.from(pictures);
    picturesSorted.sort((a, b) =>  b.comments.length - a.comments.length);
    picturesSorted.forEach((picture) => { appendPicture(picture); });
  }

  picturesListElem.appendChild(picturesFragment);

  picturesListElem.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (pictureElement) {
      const clickedPicture = pictures.find(({id}) => Number(pictureElement.dataset.id) === id);
      openPictureModal(clickedPicture);
    }
  });

};

export {renderPictures};
