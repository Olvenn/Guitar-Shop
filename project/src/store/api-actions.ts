import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { Guitar } from '../types/types';
import { loadGuitars, setTotalCounts } from './reducers/guitars';
import { APIRoute } from '../const';
import { api } from './index';

export const fetchGuitarsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
}>(
  'data/fetchGuitars',
  async (param, { dispatch }) => {
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
