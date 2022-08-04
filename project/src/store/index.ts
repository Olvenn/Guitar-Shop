import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { redirect } from './middlewares/redirect';
import { NameSpace } from '../const';
import { guitars } from './reducers/guitars';
import { guitar } from './reducers/guitar';
import { comments } from './reducers/comments';
import { coupon } from './reducers/coupon';
import { order } from './reducers/cart';
import { api } from '../services/index';

export const reducer = combineReducers({
  [NameSpace.Guitars]: guitars.reducer,
  [NameSpace.Guitar]: guitar.reducer,
  [NameSpace.Reviews]: comments.reducer,
  [NameSpace.Coupon]: coupon.reducer,
  [NameSpace.Order]: order.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
