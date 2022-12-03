import {isEscKey} from './util.js';

const uploadImage = document.querySelector('#upload-file');
const editor = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const hashtag = form.querySelector('.text__hashtags');
const comment = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const closeEditor = () => {
  uploadImage.value = '';
  hashtag.value = '';
  comment.value = '';
  editor.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onEscKeydown = (evt) => {
  if (isEscKey(evt.key) && evt.target !== hashtag && evt.target !== comment) {
    closeEditor();
  }
};

uploadImage.addEventListener('change', () => {
  document.addEventListener('keydown', onEscKeydown);
  closeButton.addEventListener('click', closeEditor, {once: true});

  document.body.classList.add('modal-open');
  editor.classList.remove('hidden');
});

let isHashtagChecked = true;
let isCommentChecked = true;
const regex = /(^\s*$)|(^#[A-zА-яЁё0-9]{1,19}$)/;

const isCorrectHashtag = (value) => regex.test(value);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text-invalid__error'
}, true);

const setSubmitButton = () => {
  submitButton.disabled = !isHashtagChecked || !isCommentChecked;
};

const validateHashtag = (value) => {
  const hashtags = value.split(' ');
  isHashtagChecked = hashtags.every(isCorrectHashtag);
  setSubmitButton();
  return isHashtagChecked;
};

const validateComment = (value) => {
  isCommentChecked = value.length < 140;
  setSubmitButton();
  return isCommentChecked;
};

pristine.addValidator(
  hashtag,
  validateHashtag,
  'Неверный формат хэштега (Допустимая длина - 20 символов)'
);

pristine.addValidator(
  comment,
  validateComment,
  'Допустимая длина комментария - 140 символов'
);

form.addEventListener('submit', () => {
  pristine.validate();
});
