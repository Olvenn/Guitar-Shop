import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Guitar, Review } from '../../types/types';

type StateProps = {
  guitars: Guitar[],
  guitar?: Guitar,
  guitarId?: number,
  reviews: Review[],
  totalCounts: number,
  currentPage: number,
};

const initialState: StateProps = {
  guitars: [],
  guitar: undefined,
  guitarId: undefined,
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
    loadGuitar: (state, action) => {
      state.guitar = action.payload;
    },
    loadGuitarId: (state, action) => {
      state.guitarId = action.payload;
    },
    setTotalCounts: (state, action) => {
      state.totalCounts = action.payload;
    },
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
});

export const { loadGuitars, loadReviews, setTotalCounts, loadGuitar, loadGuitarId } = guitars.actions;
