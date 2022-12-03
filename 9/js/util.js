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
getRandomNumber(90, 9);

function isStringLengthAllowed(string, maxLength) {
  return string.length <= maxLength;
}

isStringLengthAllowed('123456789', 5);

const isEscKey = (keyCode) => keyCode === 'Escape';
export {getRandomNumber, isStringLengthAllowed, isEscKey};
