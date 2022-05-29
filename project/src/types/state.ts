import { store } from '../store/index.js';
import { Guitar } from '../types/types';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type GuitarsProcess = {
  guitars: Guitar[],
  town: string,
};

// export type FAVORITES = {
//   favorites: Offer[],
// };

// export type COMMENTS = {
//   comments: Comment[],
//   isLoading: boolean,
//   isSuccessfully: number,
// };
