import {isEscKey} from './util.js';
import {effects, styleForFilter} from './photoEffects.js';

const uploadImage = document.querySelector('#upload-file');
const editor = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const hashtag = form.querySelector('.text__hashtags');
const comment = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.img-upload__effect-level');

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

  scaleControlValue.value = '100%';
  imagePreview.style.transform = 'scale(1)';
  imagePreview.style.filter = 'none';

});

//Наложение фильтров
effectLevel.classList.add('hidden');
sliderElement.classList.add('hidden');
let currentEffectClass = 'effects__preview--none';
let currentEffectInfo = effects['marvin'];

noUiSlider.create(
  sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 10,
    connect: 'lower'
  }
);

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  const filterInfo = currentEffectInfo.filterInfo;
  imagePreview.style.filter = styleForFilter(filterInfo, value);
  effectLevelValue.value = value.toString();
});

form.addEventListener('change', (evt) => {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }
  const newEffect = evt.target.value;
  changeEffectClass(newEffect);
  if (newEffect === 'none') {

    imagePreview.style.filter = 'none';
    effectLevel.classList.add('hidden');
    sliderElement.classList.add('hidden');

  }else {

    currentEffectInfo = effects[newEffect];
    sliderElement.noUiSlider.updateOptions(effects[newEffect].sliderOptions);
    if (effectLevel.classList.contains('hidden') ){
      effectLevel.classList.remove('hidden');}
    if (sliderElement.classList.contains('hidden')) {
      sliderElement.classList.remove('hidden');
    }
  }
});

function changeEffectClass(newEffectName) {
  const newEffectClass = `effects__preview--${newEffectName}`;
  imagePreview.classList.remove(currentEffectClass);
  imagePreview.classList.add(newEffectClass);
  currentEffectClass = newEffectClass;
}

//Масштаб изображения
scaleControlSmaller.addEventListener(
  'click',
  () => {
    const newValue = Math.max(parseInt(scaleControlValue.value, 10) - 25, 25);
    scaleControlValue.value = `${newValue}%`;
    imagePreview.style.transform = `scale(${newValue / 100})`;
  }
);

scaleControlBigger.addEventListener(
  'click',
  () => {
    const newValue = Math.min(parseInt(scaleControlValue.value, 10) + 25, 100);
    scaleControlValue.value = `${newValue}%`;
    imagePreview.style.transform = `scale(${newValue / 100})`;
  }
);

//Валидация текстовых полей
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
  const setOfHashtags = new Set();
  hashtags.forEach((tag) => {
    setOfHashtags.add(tag.toLowerCase());
  });
  isHashtagChecked = hashtags.every(isCorrectHashtag) && hashtags.length <6 && hashtags.length === setOfHashtags.size;
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
  'Неверный формат хэштега'
);

pristine.addValidator(
  comment,
  validateComment,
  'Допустимая длина комментария - 140 символов'
);

form.addEventListener('submit', () => {
  pristine.validate();
});
