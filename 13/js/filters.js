import {debounce} from './util.js';
import {renderPictures} from './pictures.js';

const filters = document.querySelectorAll('.img-filters__button');
const debounceRendering = debounce(renderPictures, 500);

const filterHandler = (pictures) => {
  filters.forEach((filter) => {
    filter.addEventListener(
      'click',
      () => {
        filters.forEach((filterButton) => filterButton.classList.remove('img-filters__button--active'));
        filter.classList.add('img-filters__button--active');
        debounceRendering(pictures, filter.id);
      }
    );
  });
};

export {filterHandler};
