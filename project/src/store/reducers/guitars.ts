import { createSlice } from '@reduxjs/toolkit';
import { GuitarsProcess } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: GuitarsProcess = {
  guitars: [],
  reviews: [],
};

export const guitars = createSlice({
  name: NameSpace.Guitars,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
    },
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
});
console.log('1', initialState);


export const { loadGuitars, loadReviews } = guitars.actions;
