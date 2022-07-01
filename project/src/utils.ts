import { Review } from './types/types';
import { RATING_ITEMS } from './const';

export const pictureNumber = ((previewImg: string) => {
  const from = previewImg.search('.jpg');
  const to = previewImg.search('-') + 1;
  return previewImg.substring(from, to);
});

export const capitalize = (str: string) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

export const sortByDateAsc = (a: Review, b: Review) => (((new Date(b.createAt)).getTime()) - ((new Date(a.createAt)).getTime()));


export const rating = Array.from(Array(RATING_ITEMS).keys());
