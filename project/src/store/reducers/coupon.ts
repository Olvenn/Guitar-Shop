import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NameSpace, APIRoute } from '../../const';
import { api } from '../../services/index';

export const fetchCouponAction = createAsyncThunk(
  'data/sendCoupon',
  async (coupon: string, { rejectWithValue }) => {
    const response = await api.post<number>(APIRoute.Coupon, { coupon });
    return response.data;
  },
);

type StateProps = {
  discount?: number;
  loading: boolean;
  error?: string;
};

const initialState: StateProps = {
  discount: undefined,
  loading: false,
  error: undefined,
};

export const coupon = createSlice({
  name: NameSpace.Coupon,
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCouponAction.pending, (state) => {
        state.discount = undefined;
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchCouponAction.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.loading = false;
      })
      .addCase(fetchCouponAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
