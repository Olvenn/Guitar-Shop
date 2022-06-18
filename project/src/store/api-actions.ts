import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { Guitar } from '../types/types';
import { loadGuitars, loadReviews, setTotalCounts, loadGuitar } from './reducers/guitars';
import { APIRoute } from '../const';

export const fetchGuitarsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (param, { dispatch, extra: api }) => {
    try {
      const { data, headers } = await api.get<Guitar[]>(`${APIRoute.Guitars}${param}&_embed=comments`);
      const totalCount = headers['x-total-count'];
      dispatch(loadGuitars(data));
      dispatch(setTotalCounts(totalCount));
    } catch (error) {
      dispatch(loadGuitars([]));
    }
  },
);

export const fetchGuitarAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Guitar>(`${APIRoute.Guitars}${id}?_embed=comments`);
      const { comments, ...guitar } = data;
      dispatch(loadGuitar(guitar));
      dispatch(loadReviews(comments));
    } catch (error) {
      dispatch(loadGuitar(undefined));
    }
  },
);
