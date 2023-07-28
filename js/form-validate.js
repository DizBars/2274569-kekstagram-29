import {onDocumentKeydown} from './upload-form.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadText = document.querySelector('.img-upload__text');
const textHashtags = imgUploadText.querySelector('.text__hashtags');
const textDescription = imgUploadText.querySelector('.text__description');

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const normilize = (value) => {
  const noNormilizeArray = value.trim().split(' ');
  const normilizeArray = noNormilizeArray.filter((tag) => tag.length > 0);
  return normilizeArray;
};

const isValidateTextHashtag = (textHashtag) => normilize(textHashtag).every((tag) => VALID_SYMBOLS.test(tag));

pristine.addValidator(
  textHashtags,
  isValidateTextHashtag,
  'Хэштег должен начинаться с #(решётка), состоять из букв и чисел и содержать 20 символов, включая решётку!'
);

const isValidateCountHashtag = (textHashtag) => normilize(textHashtag).length <= MAX_HASHTAG_COUNT;

pristine.addValidator(
  textHashtags,
  isValidateCountHashtag,
  'Нельзя указать больше пяти хэш-тегов!'
);

const isUniqueTextHashtag = (textHashtag) => {
  const lowerCase = normilize(textHashtag).map((tag) => tag.toLowerCase());
  return lowerCase.length === new Set(lowerCase).size;
};

pristine.addValidator(
  textHashtags,
  isUniqueTextHashtag,
  'Один и тот же хэш-тег не может быть использован дважды!'
);

const calcelEsc = (item) => {
  item.addEventListener('focus', () => {
    window.removeEventListener('keydown', onDocumentKeydown);
  });
  item.addEventListener('blur', () => {
    window.addEventListener('keydown', onDocumentKeydown);
  });
};
calcelEsc(textHashtags);
calcelEsc(textDescription);

export {pristine, imgUploadForm};
