import {showErrorMessage} from './load-handler.js';
import { filterHandler  } from './filters.js';

const SERVER_LOAD_FROM = 'https://26.javascript.pages.academy/kekstagram/data';
const SERVER_UPLOAD_TO = 'https://26.javascript.pages.academy/kekstagram';
const LOAD_POSTS_ERROR_MESSAGE = 'Ошибка загрузки фотографий';
const UPLOAD_POST_ERROR_MESSAGE = 'Ошибка загрузки фотографии';

const photoFilter = document.querySelector('.img-filters');

function receivePostsAsync(receivePostsFun) {
  fetch(SERVER_LOAD_FROM)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }else {
        showErrorMessage(LOAD_POSTS_ERROR_MESSAGE, reasonFromResponse(response));
      }
    })
    .then((posts) => {
      receivePostsFun(posts,'filter-default');
      filterHandler(posts);})
    .catch((reason) => showErrorMessage(LOAD_POSTS_ERROR_MESSAGE, reason))
    .then(() => {
      photoFilter.classList.remove('img-filters--inactive');
    });
}

function sendFormAsync(formData, success, error) {
  fetch(SERVER_UPLOAD_TO,
    {
      method: 'POST',
      body: formData
    })
    .then((response) => {
      if (response.ok) {
        success();
      } else {
        error(`${UPLOAD_POST_ERROR_MESSAGE  } ${  reasonFromResponse(response)}`);
      }
    })
    .catch((reason) => error(`${UPLOAD_POST_ERROR_MESSAGE  } ${reason}`));
}

function reasonFromResponse(response) {
  return `${response.status} ${response.statusText}`;
}

export {receivePostsAsync, sendFormAsync};
