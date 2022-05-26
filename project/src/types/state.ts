import { store } from '../store/index.js';

// import { Offer, Comment } from '../types/types';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// export type OffersProcess = {
//   town: string,
//   offers: Offer[],
//   isLoading: boolean,
//   activeOffer?: Offer,
//   changedOffer?: Offer,
//   offersNearby: Offer[],
// };

// export type FAVORITES = {
//   favorites: Offer[],
// };

// export type COMMENTS = {
//   comments: Comment[],
//   isLoading: boolean,
//   isSuccessfully: number,
// };
