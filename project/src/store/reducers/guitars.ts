import { createSlice } from '@reduxjs/toolkit';
import queryString from 'querystring';
import { NameSpace, MIN_PRICE, MAX_PRICE, SortType, SortOrder } from '../../const';
import { Guitar, Filter } from '../../types/types';
import { sortByPriceAsc } from '../../utils';

const params = queryString.parse(window.location.hash.slice(1));

// eslint-disable-next-line no-console
console.log(params);

export const defaultFilters = {
  minPrice: Number(params.maxPrice) || MIN_PRICE,
  maxPrice: Number(params.minPrice) || MAX_PRICE,
  type: params.type ? String(params.type) : '',
  stringsCount: params.stringsCount ? String(params.stringsCount) : '',
};

export type Sort = {
  sortType: string;
  sortOrder: string;
}

type StateProps = {
  guitars: Guitar[];
  all: Guitar[];
  minPriceDefault: number;
  maxPriceDefault: number;
  isLoading: boolean,
  totalCounts: number;
  searchGuitars?: Guitar[];
  filters?: Filter;
  sort?: {
    sortType: string;
    sortOrder: string;
  };
};

const initialState: StateProps = {
  guitars: [],
  minPriceDefault: 0,
  maxPriceDefault: 0,
  all: [],
  isLoading: false,
  totalCounts: 0,
  searchGuitars: [],
  filters: defaultFilters,
  sort: {
    sortType: params.sortType ? String(params.sortType) : SortType.Default,
    sortOrder: params.sortOrder ? String(params.sortOrder) : SortOrder.Asc,
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
    getMaxPrice: (state, action) => {
      const sortGuitars = action.payload.sort(sortByPriceAsc);
      state.minPriceDefault = sortGuitars[0].price;
    },
    getMinPrice: (state, action) => {
      const sortGuitars = action.payload.sort(sortByPriceAsc);
      state.maxPriceDefault = sortGuitars[sortGuitars.length - 1].price;
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

export const { loadGuitars, setTotalCounts, loadSearchData, loadFilters, setSort, getMaxPrice, getMinPrice } = guitars.actions;
