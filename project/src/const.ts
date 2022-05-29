// export const ZOOM = 12;
// export const MAX_COMMENTS = 10;
// export const MAX_LENGTH = 300;
// export const MIN_LENGTH = 50;

export enum SortTypes {
  Default = 'по цене',
  PriceLowToHigh = 'по популярности',
}

export enum SortPrice {
  Default = 'По возрастанию',
  PriceLowToHigh = 'По убыванию',
}

// export const cities: { [index: string]: string } = {
//   Paris: 'Paris',
//   Cologne: 'Cologne',
//   Brussels: 'Brussels',
//   Amsterdam: 'Amsterdam',
//   Hamburg: 'Hamburg',
//   Dusseldorf: 'Dusseldorf',
// };


// export const ratings: { id: string, name: string }[] = [
//   { 'id': '5-stars', 'name': 'perfect' },
//   { 'id': '4-stars', 'name': 'good' },
//   { 'id': '3-stars', 'name': 'not bad' },
//   { 'id': '2-stars', 'name': 'badly' },
//   { 'id': '1-stars', 'name': 'erribly' },
// ];

export enum AppRoute {
  Root = '/',
  Item = '/guitar/:id',
  Cart = '/basket',
  // Favorites = '/favorites',
  NotFound = '/not-found',
  // Contacts = '/not-found',
  Buy = '/not-found',
  About = '/not-found',

}

export const mainNavItems: { [index: string]: string[] } = {
  Catalog: ['Каталог', AppRoute.Root],
  Buy: ['Где купить?', AppRoute.Buy],
  About: ['О компании', AppRoute.About],
};

// export const TIMEOUT_SHOW_ERROR = 2000;

export enum APIRoute {
  Guitars = '/guitars/',
  Coupons = '/coupons',
  Orders = '/orders',
  Comments = '/comments',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export enum NameSpace {
  Guitars = 'GUITARS',
  // Favorites = 'FAVORITES',
  // Comments = 'COMMENTS',
  // User = 'USER',
  Main = 'MAIN',
}
