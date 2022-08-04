export const ITEMS_PER_PAGE = 9;
export const RATING_ITEMS = 5;
export const MIN_PRICE = 1700;
export const MAX_PRICE = 35000;

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  Item = '/item/:id',
  Cart = '/cart',
}

export enum APIRoute {
  Guitars = '/guitars/',
  Comments = '/comments',
  Coupon = '/coupons',
}

export enum NameSpace {
  Guitars = 'GUITARS',
  Guitar = 'GUITAR',
  Reviews = 'COMMENTS',
  Order = 'ORDER',
  Coupon = 'COUPON',
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

export const GuitarType = {
  electric: 'Электрогитара',
  ukulele: 'Укулеле',
  acoustic: 'Акустическая гитара',
  unknown: 'Тип неизветен',
} as const;

export enum CommentFieldsName {
  UserName = 'user-name',
  Adv = 'adv',
  Disadv = 'disadv',
}

export enum StringsCount {
  Four = '4',
  Six = '6',
  Seven = '7',
  Twelve = '12',
}

export enum SortType {
  Default = 'default',
  Price = 'price',
  Rate = 'rating',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}
