import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state.js';
import { Guitar, Comment } from '../types/types';
import { loadGuitars, setTotalCounts, loadSearchData } from './reducers/guitars';
import { setIsLoading, setSuccessfully } from './reducers/comments';
import { APIRoute, ITEMS_PER_PAGE } from '../const';
import { getFilters, selectSort } from './reducers/selectors';

export const fetchGuitarsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchGuitars',
  async (page, { dispatch, getState, extra: api }) => {
    const state = getState();
    const filters = getFilters(state);
    const sort = selectSort(state);

    let querySort = '?';
    querySort = sort?.type === 'default' ? querySort : `?_sort=${sort?.type}&_order=${sort?.order}&`;

    const query = `${querySort}price_gte=${filters?.minPrice}&price_lte=${filters?.maxPrice}${filters?.stringsCount}${filters?.type}&_start=${(+page - 1) * ITEMS_PER_PAGE}&_limit=${ITEMS_PER_PAGE}`;

    try {
      const { data, headers } = await api.get<Guitar[]>(`${APIRoute.Guitars}${query}&_embed=comments`);
      const totalCount = headers['x-total-count'];
      dispatch(loadGuitars(data));
      dispatch(setTotalCounts(totalCount));
    } catch (error) {
      dispatch(loadGuitars([]));
    }
  },
);

export const searchAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchSearch',
  async (query, { dispatch, extra: api }) => {
    try {
      const { data, headers } = await api.get<Guitar[]>(`${APIRoute.Guitars}?name_like=${query}`);
      const totalCount = headers['x-total-count'];
      dispatch(loadSearchData(data));
      dispatch(setTotalCounts(totalCount));
    } catch (error) {
      dispatch(loadSearchData([]));
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
