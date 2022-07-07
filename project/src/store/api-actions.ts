import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state.js';
import { Guitar, Comment } from '../types/types';
import { loadGuitars, setTotalCounts } from './reducers/guitars';
import { setIsLoading, setSuccessfully } from './reducers/comments';
import { APIRoute } from '../const';

export const fetchGuitarsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchGuitars',
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

export const commentAction = createAsyncThunk<void, Comment, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'user/Addcomment',
  async ({ guitarId, userName, advantage, disadvantage, comment, rating }, { dispatch, extra: api }) => {
    try {
      dispatch(setIsLoading(true));
      await api.post<Comment>(APIRoute.Comments, { guitarId, userName, advantage, disadvantage, comment, rating });
      dispatch(setIsLoading(false));
      dispatch(setSuccessfully(true));
    } catch (error) {
      dispatch(setIsLoading(true));
    }
  },
);
