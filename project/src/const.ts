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
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично',
} as const;
