import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import {getRandomNumber} from './util.js';


const PHOTOS = 25;
const MIN_LIKES  = 15;
const MAX_LIKES = 200;
const MAX_AVATAR = 6;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

let commentIndex = 1;
const getComments = () => ({
  id: commentIndex++,
  avatar: `img/avatar-${getRandomNumber(1, MAX_AVATAR)}.svg`,
  message:  faker.datatype.boolean() ? MESSAGES[getRandomNumber(0, MESSAGES.length - 1)] :
    `${MESSAGES[getRandomNumber(0, MESSAGES.length - 1)]} ${MESSAGES[getRandomNumber(0, MESSAGES.length - 1)]}`,
  name: faker.name.firstName(),
});


const photos = () => Array.from({length: PHOTOS}).map((value, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: faker.lorem.sentence(getRandomNumber(1, 5)),
  likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: getRandomNumber(0, 15)}).map(() => getComments()),
}));


export {photos};
