import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Guitar, Review } from '../../types/types';

type StateProps = {
  guitars: Guitar[],
<<<<<<< HEAD
  guitar?: Guitar,
  guitarId?: number,
=======
>>>>>>> c81edab11eeb3f4cbea93529e666b372787e3844
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
    setTotalCounts: (state, action) => {
      state.totalCounts = action.payload;
    },
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
});

<<<<<<< HEAD
export const { loadGuitars, loadReviews, setTotalCounts, loadGuitar, loadGuitarId } = guitars.actions;
=======
export const { loadGuitars, loadReviews, setTotalCounts, setCurrentPage } = guitars.actions;
>>>>>>> c81edab11eeb3f4cbea93529e666b372787e3844
