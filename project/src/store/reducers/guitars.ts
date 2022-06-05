import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Guitar, Review } from '../../types/types';

type StateProps = {
  guitars: Guitar[],
  reviews: Review[],
  totalCounts: number,
  currentPage: number,
};

const initialState: StateProps = {
  guitars: [],
  reviews: [],
  totalCounts: 0,
  currentPage: 1,
};

export const guitars = createSlice({
  name: NameSpace.Guitars,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
    },
    setTotalCounts: (state, action) => {
      state.totalCounts = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.totalCounts = action.payload;
    },
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
});

export const { loadGuitars, loadReviews, setTotalCounts, setCurrentPage } = guitars.actions;
