import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { cart, fetchCartGuitarsAction, addGuitarToCart, decreaseGuitarsCount, clearCart, deleteGuitar, setGuitarCount } from '../reducers/cart';
import { APIRoute } from '../../const';
import { getCart } from '../../services/cart';
import { makeFakeGuitars } from '../../mock';

describe('Reducer: coupon', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const GUITARS_COUNT = 25;
  const fakeGuitars = makeFakeGuitars(GUITARS_COUNT);

  const GUITARS_CART_COUNT = 4;
  const fakeCartGuitars = fakeGuitars.slice(GUITARS_COUNT - GUITARS_CART_COUNT);
  const guitarNumbers = fakeCartGuitars.map((guitar) => guitar.id.toString());

  const initialState = {
    guitars: [],
    guitarIdsWithCount: getCart(),
    loading: false,
    error: undefined,
  };

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch loadGuitars when GET /Guitars', async () => {
    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(200, fakeCartGuitars);

    const store = mockStore();
    await store.dispatch(fetchCartGuitarsAction(guitarNumbers));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(fetchCartGuitarsAction.pending.type);
    expect(actions).toContain(fetchCartGuitarsAction.fulfilled.type);
    expect(actions).not.toContain(fetchCartGuitarsAction.rejected.type);
  });

  it('without additional parameters should return initial state', () => {
    expect(cart.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        guitars: [],
        guitarIdsWithCount: {},
        loading: false,
        error: undefined,
      });
  });

  it('should be update parameters when fetch type pending', () => {
    const action = {
      type: fetchCartGuitarsAction.pending.type,
    };
    const state = cart.reducer(initialState, action);
    expect(state)
      .toEqual({
        guitars: [],
        guitarIdsWithCount: {},
        loading: true,
        error: undefined,
      });
  });

  it('should be update parameters when fetch type fulfilled', () => {
    const action = {
      type: fetchCartGuitarsAction.fulfilled.type,
      payload: fakeCartGuitars,
    };
    const state = cart.reducer(initialState, action);
    expect(state)
      .toEqual({
        guitars: fakeCartGuitars,
        guitarIdsWithCount: {},
        loading: false,
        error: undefined,
      });
  });

  it('should be update parameters when fetch type rejected', () => {
    const action = {
      type: fetchCartGuitarsAction.rejected.type,
      error: { message: 'Error' },
    };
    const state = cart.reducer(initialState, action);
    expect(state)
      .toEqual({
        guitars: [],
        guitarIdsWithCount: {},
        loading: false,
        error: 'Error',
      });
  });

  it('should update cart by add guitar to cart', () => {
    const id = 1;

    const state = {
      guitars: [],
      guitarIdsWithCount: {},
      loading: false,
      error: undefined,
    };
    expect(cart.reducer(state, addGuitarToCart(id)))
      .toEqual({
        guitars: [],
        guitarIdsWithCount: { 1: 1 },
        loading: false,
        error: undefined,
      });
  });

  it('should increase guitar count click "+"', () => {
    const id = 1;

    const state = {
      guitars: [],
      guitarIdsWithCount: { 1: 1 },
      loading: false,
      error: undefined,
    };
    expect(cart.reducer(state, addGuitarToCart(id)))
      .toEqual({
        guitars: [],
        guitarIdsWithCount: { 1: 2 },
        loading: false,
        error: undefined,
      });
  });

  it('should decrease guitar count click "-"', () => {
    const id = 1;

    const state = {
      guitars: [],
      guitarIdsWithCount: { 1: 2 },
      loading: false,
      error: undefined,
    };
    expect(cart.reducer(state, decreaseGuitarsCount(id)))
      .toEqual({
        guitars: [],
        guitarIdsWithCount: { 1: 1 },
        loading: false,
        error: undefined,
      });
  });

  it('should delete guitar when click on "x"', () => {
    const id = 1;

    const state = {
      guitars: [],
      guitarIdsWithCount: { 1: 2, 2: 3 },
      loading: false,
      error: undefined,
    };
    expect(cart.reducer(state, deleteGuitar({ guitarId: id })))
      .toEqual({
        guitars: [],
        guitarIdsWithCount: { 2: 3 },
        loading: false,
        error: undefined,
      });
  });

  it('should change guitar count by input a value', () => {
    const id = 1;
    const count = 3;

    const state = {
      guitars: [],
      guitarIdsWithCount: { 1: 2 },
      loading: false,
      error: undefined,
    };
    expect(cart.reducer(state, setGuitarCount({ guitarId: id, count })))
      .toEqual({
        guitars: [],
        guitarIdsWithCount: { 1: 3 },
        loading: false,
        error: undefined,
      });
  });

  it('should update cart by clear cart', () => {
    const state = {
      guitars: fakeCartGuitars,
      guitarIdsWithCount: {},
      loading: false,
      error: undefined,
    };
    expect(cart.reducer(state, clearCart()))
      .toEqual({
        guitars: [],
        guitarIdsWithCount: {},
        loading: false,
        error: undefined,
      });
  });
});
