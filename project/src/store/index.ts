import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { redirect } from './middlewares/redirect';
import { createAPI } from '../services/api';
import { NameSpace } from '../const';
import { guitars } from './reducers/guitars';
import { guitar } from './reducers/guitar';
import { comments } from './reducers/comments';

export const api = createAPI();
export const reducer = combineReducers({
  [NameSpace.Guitars]: guitars.reducer,
  [NameSpace.Guitar]: guitar.reducer,
  [NameSpace.Reviews]: comments.reducer,
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
