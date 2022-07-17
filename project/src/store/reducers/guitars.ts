import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Guitar } from '../../types/types';

type StateProps = {
  guitars: Guitar[];
  totalCounts: number;
  searchGuitars?: Guitar[];
};

const initialState: StateProps = {
  guitars: [],
  totalCounts: 0,
  searchGuitars: [],
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
    loadSearchData: (state, action) => {
      state.searchGuitars = action.payload;
    },
  },
});

export const { loadGuitars, setTotalCounts, loadSearchData } = guitars.actions;
