import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { NameSpace, APIRoute } from '../../const';
import { Guitar } from '../../types/types';
import { api } from '../index';

export const fetchGuitarAction = createAsyncThunk(
  'data/fetchGuitar',
  async (id: number, { rejectWithValue }) => {
    const response = await api.get<Guitar>(`${APIRoute.Guitars}${id}?_embed=comments`);
    return response.data;
  },
);

type StateProps = {
  guitar?: Guitar;
  loading: boolean;
  error?: string;
};

const initialState: StateProps = {
  guitar: undefined,
  loading: false,
  error: undefined,
};

export const guitar = createSlice({
  name: NameSpace.Guitar,
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuitarAction.pending, (state) => {
        state.guitar = undefined;
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchGuitarAction.fulfilled, (state, action) => {
        state.guitar = action.payload;
        state.loading = false;
      })
      .addCase(fetchGuitarAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
