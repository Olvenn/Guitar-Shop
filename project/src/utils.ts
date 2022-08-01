import { Review } from './types/types';
import { RATING_ITEMS } from './const';

export const getPictureNumber = ((previewImg: string) => {
  const from = previewImg.search('.jpg');
  const to = previewImg.search('-') + 1;
  return previewImg.substring(from, to);
});

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

export const sortByDateAsc = (a: Review, b: Review) => (((new Date(b.createAt)).getTime()) - ((new Date(a.createAt)).getTime()));

export const ratingValues = Array.from(Array(RATING_ITEMS).keys());

export const stopBodyScroll = () => {
  const getBodyScrollTop = () =>
    window.self.pageYOffset || (document.body && document.body.scrollTop);

  document.body.dataset.scrollY = getBodyScrollTop().toString();

  if (document.body.offsetHeight > window.innerHeight) {
    document.body.classList.add('body-lock');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${document.body.dataset.scrollY}px`;
  }
};

export const startBodyScroll = () => {
  document.body.style.position = 'static';
  if (document.body.offsetHeight > window.innerHeight) {
    const scroll = document.body.dataset.scrollY
      ? +document.body.dataset.scrollY : 0;
    window.scrollTo(0, scroll);
  }
};
