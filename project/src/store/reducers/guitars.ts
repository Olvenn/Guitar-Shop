import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Guitar, Review } from '../../types/types';

type StateProps = {
  guitars: Guitar[],
<<<<<<< HEAD
  guitar?: Guitar,
<<<<<<< HEAD
=======
  guitarId?: number,
=======
>>>>>>> c81edab11eeb3f4cbea93529e666b372787e3844
>>>>>>> main
  reviews: Review[],
  totalCounts: number,
};

const initialState: StateProps = {
  guitars: [],
  guitar: undefined,
  reviews: [],
  totalCounts: 0,
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
  },
});

export const { loadGuitars, loadReviews, setTotalCounts, loadGuitar } = guitars.actions;
