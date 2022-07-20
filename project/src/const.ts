export const ITEMS_PER_PAGE = 9;
export const RATING_ITEMS = 5;
export const MIN_PRICE = 1000;
export const MAX_PRICE = 40000;

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  CatalogPage = '/catalog/:page',
  Item = '/item/:id',
  Cart = '/cart',
}

export enum APIRoute {
  Guitars = '/guitars/',
  Comments = '/comments',
}

export enum NameSpace {
  Guitars = 'GUITARS',
  Guitar = 'GUITAR',
  Reviews = 'COMMENTS',
}

export const months = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноябрья',
  'Декабря',
];

export const RatingText = {
  1: 'Отлично',
  2: 'Хорошо',
  3: 'Нормально',
  4: 'Плохо',
  5: 'Ужасно',
} as const;

export enum commentFieldsName {
  UserName = 'user-name',
  Adv = 'adv',
  Disadv = 'disadv',
}

export const StringCounts = {
  acoustic: ['6', '7', '12'],
  electric: ['4', '6', '7'],
  ukulele: ['4'],
} as const;

export enum SortTypes {
  sortByPriceAsc = '?_sort=price&_order=asc&',
  sortByPriceDesc = '?_sort=price&_order=desc&',
  sortByRatingAsc = '?_sort=rating&_order=asc&',
  sortByRatingDesc = '?_sort=rating&_order=desc&',
}
