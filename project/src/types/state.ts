import { store } from '../store/index.js';
import { Guitar, Review } from '../types/types';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type GuitarsProcess = {
  guitars: Guitar[],
  reviews: Review[],
};
