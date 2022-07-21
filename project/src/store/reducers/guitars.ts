import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, MIN_PRICE, MAX_PRICE } from '../../const';
import { Guitar, Filter } from '../../types/types';

export const defaultFilters = {
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
  type: '',
  stringsCount: '',
};

export type Sort = {
  type: string;
  order: string;
}

type StateProps = {
  guitars: Guitar[];
  isLoading: boolean,
  totalCounts: number;
  searchGuitars?: Guitar[];
  filters?: Filter;
  sort?: {
    type: string;
    order: string;
  };
};

const initialState: StateProps = {
  guitars: [],
  isLoading: false,
  totalCounts: 0,
  searchGuitars: [],
  filters: defaultFilters,
  sort: {
    type: 'Default',
    order: '',
  },
};

export const guitars = createSlice({
  name: NameSpace.Guitars,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
      state.isLoading = true;
    },
    setTotalCounts: (state, action) => {
      state.totalCounts = action.payload;
    },
    loadSearchData: (state, action) => {
      state.searchGuitars = action.payload;
    },
    loadFilters: (state, action) => {
      state.filters = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { loadGuitars, setTotalCounts, loadSearchData, loadFilters, setSort } = guitars.actions;
