import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NameSpace, APIRoute } from '../../const';
import { Guitar, GuitarWithCount } from '../../types/types';
import { api } from '../../services/index';

export const fetchCartGuitarsAction = createAsyncThunk(
  'data/fetchCartGuitar',
  async (id: number, { rejectWithValue }) => {
    const response = await api.get<Guitar>(`${APIRoute.Guitars}${id}`);
    return response.data;
  },
);

type StateProps = {
  price: number;
  guitarsId: number[];
  guitarsWithCount?: GuitarWithCount[];
  loading: boolean;
  error?: string;
};

const initialState: StateProps = {
  price: 0,
  guitarsId: [],
  guitarsWithCount: [],
  loading: false,
  error: undefined,
};

export const order = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {
    setGuitarCount: (state, action) => {
      const newGuitars = state.guitarsWithCount;

      newGuitars?.map((guitar) => guitar?.guitar?.id === action?.payload[0] ? { ...guitar, count: action.payload[1] } : guitar);

      state.guitarsWithCount = newGuitars;
    },

    setGuitarsId: (state, action) => {
      if (!state?.guitarsId.includes(action.payload)) {
        state.guitarsId.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartGuitarsAction.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchCartGuitarsAction.fulfilled, (state, action) => {
        const newGuitars = state.guitarsWithCount;
        if (!state.guitarsWithCount?.some((guitar) => guitar.guitar.id === action.payload.id)) {
          newGuitars?.push({
            guitar: action.payload,
            count: 2,
          });
        }
        state.guitarsWithCount = newGuitars;
        state.loading = false;
      })
      .addCase(fetchCartGuitarsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setGuitarCount, setGuitarsId } = order.actions;
