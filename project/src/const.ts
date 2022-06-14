export const ITEMS_PER_PAGE = 9;
export const RATING_ITEMS = 5;

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  Item = '/item/:id',
  Cart = '/cart',
}

export enum APIRoute {
  Guitars = '/guitars/',
  Coupons = '/coupons',
  Orders = '/orders',
  Reviews = '/guitars/1/comments',
}

export enum NameSpace {
  Guitars = 'GUITARS',
}

export const Months = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августм',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабря',
];
