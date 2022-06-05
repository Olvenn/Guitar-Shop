import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { AxiosInstance } from 'axios';
import { Guitar, Review } from '../types/types';
import { loadGuitars, loadReviews, setTotalCounts } from './reducers/guitars';
import { APIRoute } from '../const';


export const fetchGuitarsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (param, { dispatch, extra: api }) => {
    try {
      const { data, headers } = await api.get<Guitar[]>(`${APIRoute.Guitars}${param}`);
      const totalCount = headers['X-Total-Count'];
      dispatch(loadGuitars(data));
      dispatch(setTotalCounts(totalCount));
    } catch (error) {
      dispatch(loadGuitars([]));
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Review[]>(APIRoute.Reviews);
      dispatch(loadReviews(data));
    } catch (error) {
      dispatch(loadReviews([]));
    }
  },
);
