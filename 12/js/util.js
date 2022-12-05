function getRandomNumber(min, max) {
  if(min < 0 || max < 0) {
    return null;
  }
  if(min > max) {
    const a = max;
    max = min;
    min = a;

  }
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(Math.abs(rand));
}

function isStringLengthAllowed(string, maxLength) {
  return string.length <= maxLength;
}

const isEscKey = (keyCode) => keyCode === 'Escape';

function randomElement(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

function randomElements(n, array) {
  const set = new Set();
  for (let i = 0; i < n; i++) {
    let element;
    do {
      element = randomElement(array);
    } while (set.has(element));
    set.add(element);
  }
  return Array.from(set);
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomNumber, isStringLengthAllowed, isEscKey, randomElements, debounce};
