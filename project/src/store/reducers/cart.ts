import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NameSpace, APIRoute } from '../../const';
import { Guitar, GuitarsIdsWithCount } from '../../types/types';
import { api } from '../../services/index';
import { getCart } from '../../services/cart';

export const fetchCartGuitarsAction = createAsyncThunk(
  'data/fetchCartGuitar',
  async (guitarsIds: string[]) => {
    const response = await api.get<Guitar[]>(`${APIRoute.Guitars}/?${guitarsIds.map((guitarId) => `id=${guitarId}`).join('&')}`);
    return response.data;
  },
);

type InitialState = {
  guitars: Guitar[];
  guitarIdsWithCount: GuitarsIdsWithCount;
  loading: boolean;
  error?: string;
};

const initialState: InitialState = {
  guitars: [],
  guitarIdsWithCount: getCart(),
  loading: false,
  error: undefined,
};

export const cart = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addGuitarToCart: (state, action) => {
      if (state.guitarIdsWithCount[action.payload]) {
        state.guitarIdsWithCount[action.payload] += 1;
      } else {
        state.guitarIdsWithCount[action.payload] = 1;
      }
    },
    setGuitarCount: (state, action) => {
      const { guitarId, count } = action.payload;
      if (state.guitarIdsWithCount[guitarId]) {
        state.guitarIdsWithCount[guitarId] = count;
      }
    },
    increaseGuitarsCount: (state, action) => {
      if (state.guitarIdsWithCount[action.payload]) {
        state.guitarIdsWithCount[action.payload] += 1;
      }
    },
    decreaseGuitarsCount: (state, action) => {
      if (state.guitarIdsWithCount[action.payload]) {
        state.guitarIdsWithCount[action.payload] -= 1;
      }
    },
    deleteGuitar: (state, action) => {
      state.guitars = [];
      const { [action.payload.guitarId]: _, ...guitarIdsWithCount } = state.guitarIdsWithCount;
      state.guitarIdsWithCount = guitarIdsWithCount;
    },
    clearCart: (state) => {
      state.guitars = [];
      state.guitarIdsWithCount = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartGuitarsAction.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchCartGuitarsAction.fulfilled, (state, action) => {
        state.guitars = action.payload;
        state.loading = false;
      })
      .addCase(fetchCartGuitarsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setGuitarCount, addGuitarToCart, increaseGuitarsCount, decreaseGuitarsCount, clearCart, deleteGuitar } = cart.actions;
