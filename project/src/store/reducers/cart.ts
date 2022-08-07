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
  price: number;
  guitars: Guitar[];
  guitarIdsWithCount: GuitarsIdsWithCount;
  loading: boolean;
  error?: string;
};

const initialState: InitialState = {
  price: 0,
  guitars: [],
  guitarIdsWithCount: getCart(),
  loading: false,
  error: undefined,
};

export const order = createSlice({
  name: NameSpace.Order,
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
      if (state.guitarIdsWithCount[action.payload.quitarId]) {
        state.guitarIdsWithCount[action.payload.quitarId] = action.payload.count;
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
      delete state.guitarIdsWithCount[action.payload.guitarId];
    },
    clearCart: (state) => {
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

export const { setGuitarCount, addGuitarToCart, increaseGuitarsCount, decreaseGuitarsCount, clearCart, deleteGuitar } = order.actions;
