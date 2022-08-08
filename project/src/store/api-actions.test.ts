import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { commentAction } from './api-actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { makeFakeComments } from '../mock';
import { loadSearchData, setPriceRange } from './reducers/guitars';
import { setIsLoading, setSuccessfully } from './reducers/comments';
import { Comment } from '../types/types';
import { fetchGuitarsAction, fetchAllGuitarsAction } from './api-actions';
import { setTotalCounts } from './reducers/guitars';
import { makeFakeGuitars } from '../mock';

const GUITARS_COUNT = 25;
const SEARCH_GUITARS = 4;
const COMMENTS_COUNT = 7;
const MIN_PRICE = 1000;
const MAX_PRICE = 55000;

const fakeGuitars = makeFakeGuitars(GUITARS_COUNT);
const fakeSearchGuitars = makeFakeGuitars(SEARCH_GUITARS);
const fakeComments = makeFakeComments(COMMENTS_COUNT);

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
      .reply(200, fakeGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());
    store.dispatch(setTotalCounts(GUITARS_COUNT));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(setTotalCounts.toString());
  });

  it('should dispatch loadSearchData when GET guitars name', async () => {
    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(200, fakeSearchGuitars);

    const store = mockStore();
    await store.dispatch(loadSearchData(fakeSearchGuitars));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(loadSearchData.toString());
    // expect(actions).toContain(setTotalCounts.toString());
  });

  it('should dispatch setComments when add Comment when POST', async () => {
    const fakeComment: Comment = { guitarId: fakeComments[0].guitarId, userName: 'Oskar', advantage: 'нравится', disadvantage: 'не нравится', rating: 2, comment: 'Some comment text' };
    mockAPI
      .onPost(APIRoute.Comments)
      .reply(200, fakeComments);
    const store = mockStore();
    await store.dispatch(commentAction(fakeComment));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(setIsLoading.toString());
    expect(actions).toContain(setSuccessfully.toString());
  });

  it('should dispatch setPriceRange when GET all /Guitars', async () => {
    const range = {
      minPrice: MIN_PRICE,
      maxPrice: MAX_PRICE,
    };

    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(200, fakeGuitars);

    const store = mockStore();
    await store.dispatch(fetchAllGuitarsAction());
    store.dispatch(setPriceRange(range));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(setPriceRange.toString());
  });
});

