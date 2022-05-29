import { createReducer } from '@reduxjs/toolkit';
import { setError } from '../action';

type InitalState = {
  error: string,
};

const initialState: InitalState = {
  error: '1',
};

const main = createReducer(initialState, (builder) => {
  builder
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

console.log(initialState.error);


export { main };
