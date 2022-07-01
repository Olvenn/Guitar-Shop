import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

export type COMMENTS = {
  isLoading: boolean;
  isSuccessfully: boolean,
}

const initialState: COMMENTS = {
  isLoading: true,
  isSuccessfully: false,
};

export const comments = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSuccessfully: (state, action) => {
      state.isSuccessfully = action.payload;
    },
  },
});

export const { setIsLoading, setSuccessfully } = comments.actions;
