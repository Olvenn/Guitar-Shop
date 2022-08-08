import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { coupon, fetchCouponAction } from '../reducers/coupon';
import { APIRoute } from '../../const';

describe('Reducer: coupon', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const COUPON_NUMBER = 15;

  const initialState = {
    discount: undefined,
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
      .onGet(APIRoute.Coupon)
      .reply(200, COUPON_NUMBER);

    const store = mockStore();
    await store.dispatch(fetchCouponAction('light-333'));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(fetchCouponAction.pending.type);
    expect(actions).toContain(fetchCouponAction.fulfilled.type);
    expect(actions).not.toContain(fetchCouponAction.rejected.type);
  });

  it('without additional parameters should return initial state', () => {
    expect(coupon.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        discount: undefined,
        loading: false,
        error: undefined,
      });
  });

  it('should be update parameters when fetch type pending', () => {
    const action = {
      type: fetchCouponAction.pending.type,
    };
    const state = coupon.reducer(initialState, action);
    expect(state)
      .toEqual({
        discount: undefined,
        loading: true,
        error: undefined,
      });
  });

  it('should be update parameters when fetch type fulfilled', () => {
    const action = {
      type: fetchCouponAction.fulfilled.type,
      payload: COUPON_NUMBER,
    };
    const state = coupon.reducer(initialState, action);
    expect(state)
      .toEqual({
        discount: 15,
        loading: false,
        error: undefined,
      });
  });

  it('should be update parameters when fetch type rejected', () => {
    const action = {
      type: fetchCouponAction.rejected.type,
      error: { message: 'Error' },
    };
    const state = coupon.reducer(initialState, action);
    expect(state)
      .toEqual({
        discount: undefined,
        loading: false,
        error: 'Error',
      });
  });
});
