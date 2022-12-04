import {isEscKey} from './util.js';


const pictureModalElement = document.querySelector('.big-picture');
const commentCountElement = pictureModalElement.querySelector('.comments-count');
const imageElement = pictureModalElement.querySelector('.big-picture__img').querySelector('img');
const likesCountElement = pictureModalElement.querySelector('.likes-count');
const descriptionElement = pictureModalElement.querySelector('.social__caption');
const buttonCloseElement = pictureModalElement.querySelector('#picture-cancel');
const commentCountOnPic = pictureModalElement.querySelector('.social__comment-count');
const commentsLoader = pictureModalElement.querySelector('.comments-loader');
const commentListElement = pictureModalElement.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

let arrayOfComments;
let loadedCommentsNum = 0;

const renderComment = (comment) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const onLoadMoreButton = () => {
  for (let i = loadedCommentsNum; i < loadedCommentsNum + 5; i++) {
    const allComments = ` из ${arrayOfComments.length} комментариев`;
    if (i === arrayOfComments.length - 1) {
      commentsLoader.classList.add('hidden');
    }
    if (i >= arrayOfComments.length) {
      break;
    }
    const comment = renderComment(arrayOfComments[i]);
    commentListElement.appendChild(comment);
    commentCountOnPic.textContent = `${i + 1}${allComments}`;
  }
  loadedCommentsNum += 5;
};

const renderPartOfComments = () => {
  const allComments = ` из ${arrayOfComments.length} комментариев`;
  const commentsNumber = arrayOfComments.length < 6 ? arrayOfComments.length : 5;
  commentCountOnPic.textContent = `${commentsNumber}${allComments}`;
  for (let i = 0; i < commentsNumber; i++) {
    const comment = renderComment(arrayOfComments[i]);
    commentListElement.appendChild(comment);
    loadedCommentsNum = i + 1;
  }
};

const closePictureModal = () => {
  pictureModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentCountOnPic.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  commentsLoader.removeEventListener('click', onLoadMoreButton);
};

const onPictureModalKeydown = (evt) => {
  if (isEscKey(evt.key)) {
    closePictureModal();
  }
};

const onPictureModalCloseClick = () => {
  closePictureModal();
};

const openPictureModal = ({url, likes, comments, description}) => {
  imageElement.src = url;
  commentCountElement.textContent = comments.length;
  likesCountElement.textContent = likes;
  descriptionElement.textContent = description;
  document.body.classList.add('modal-open');
  pictureModalElement.classList.remove('hidden');

  commentCountOnPic.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  commentListElement.textContent = '';
  loadedCommentsNum = 0;
  arrayOfComments = comments;

  if (arrayOfComments.length <= 5) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onLoadMoreButton);
  }

  renderPartOfComments();

  document.addEventListener('keydown', onPictureModalKeydown);
  buttonCloseElement.addEventListener('click', onPictureModalCloseClick, {once:true});
};

export {openPictureModal};
