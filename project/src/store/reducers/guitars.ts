import { createSlice } from '@reduxjs/toolkit';
import { GuitarsProcess } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: GuitarsProcess = {
  guitars: [],
  town: 'Paris',
};

export const guitars = createSlice({
  name: NameSpace.Guitars,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
    },
    changeCity: (state, action) => {
      state.town = "action.payload";
    },
  },
});

console.log('1', initialState);


export const { loadGuitars, changeCity } = guitars.actions;
