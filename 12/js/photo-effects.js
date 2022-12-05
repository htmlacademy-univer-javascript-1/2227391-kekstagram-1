
const effects = {
  'chrome': makeEffect('grayscale', '', 0, 1, 1, 0.1),
  'sepia': makeEffect('sepia', '', 0, 1, 1, 0.1),
  'marvin': makeEffect('invert', '%', 0, 100, 100, 1),
  'phobos': makeEffect('blur', 'px', 0, 3, 3, 0.1),
  'heat': makeEffect('brightness', '', 1, 3, 3, 0.1)
};

function makeEffect(filterName, valueUnit, minValue, maxValue, startValue, step) {
  return {
    filterInfo: makeFilterInfo(filterName, valueUnit),
    sliderOptions: makeOptions(minValue, maxValue, startValue, step)
  };

}

function makeFilterInfo(filterName, valueUnit) {
  return {
    filterName: filterName,
    valueUnit: valueUnit,
  };
}

function makeOptions(min, max, start, step) {
  return {
    range: {min, max},
    start: start,
    step: step,
    connect: 'lower'
  };
}

function styleForFilter(filterInfo, value) {
  return `${filterInfo.filterName}(${value}${filterInfo.valueUnit})`;
}

export {effects, styleForFilter};
