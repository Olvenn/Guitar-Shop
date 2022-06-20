import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Guitar, Review } from '../../types/types';

type StateProps = {
  guitars: Guitar[],
  guitar?: Guitar,
  reviews: Review[],
  totalCounts: number,
  isSuccessfully: number,
};

const initialState: StateProps = {
  guitars: [],
  guitar: undefined,
  reviews: [],
  totalCounts: 0,
  isSuccessfully: 0,
};

export const guitars = createSlice({
  name: NameSpace.Guitars,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
    },
    loadGuitar: (state, action) => {
      state.guitar = action.payload;
    },
    setTotalCounts: (state, action) => {
      state.totalCounts = action.payload;
    },
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setSuccessfully: (state, action) => {
      state.isSuccessfully = action.payload;
    },
  },
});

export const { loadGuitars, loadReviews, setTotalCounts, loadGuitar, setSuccessfully } = guitars.actions;
