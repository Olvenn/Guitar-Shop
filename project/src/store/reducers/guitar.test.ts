import { Action } from 'redux';
import { State } from '../../types/state';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { APIRoute } from '../../const';
import { guitar, fetchGuitarAction } from '../reducers/guitar';
import { makeFakeGuitar } from '../../mock';

const fakeGuitar = makeFakeGuitar();

const initialState = {
  guitar: undefined,
  loading: false,
  error: undefined,
};

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch loadGuitars when GET /Guitars', async () => {
    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(200, fakeGuitar);

    const store = mockStore();
    await store.dispatch(fetchGuitarAction(fakeGuitar.id));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(fetchGuitarAction.pending.type);
    expect(actions).not.toContain(fetchGuitarAction.fulfilled.type);
    expect(actions).toContain(fetchGuitarAction.rejected.type);
  });
});

describe('Reducer: guitar', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitar.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        guitar: undefined,
        loading: false,
        error: undefined,
      });
  });

  it('should be update parameters when fetch type pending', () => {
    const action = {
      type: fetchGuitarAction.pending.type,
    };
    const state = guitar.reducer(initialState, action);
    expect(state)
      .toEqual({
        guitar: undefined,
        loading: true,
        error: undefined,
      });
  });

  it('should be update parameters when fetch type fulfilled', () => {
    const action = {
      type: fetchGuitarAction.fulfilled.type,
      payload: fakeGuitar,
    };
    const state = guitar.reducer(initialState, action);
    expect(state)
      .toEqual({
        guitar: fakeGuitar,
        loading: false,
        error: undefined,
      });
  });

  it('should be update parameters when fetch type rejected', () => {
    const action = {
      type: fetchGuitarAction.rejected.type,
      error: { message: 'Error' },
    };
    const state = guitar.reducer(initialState, action);
    expect(state)
      .toEqual({
        guitar: undefined,
        loading: false,
        error: 'Error',
      });
  });
});
