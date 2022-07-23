import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { fetchGuitarsAction, commentAction } from './api-actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { setTotalCounts } from './reducers/guitars';
import { setIsLoading, setSuccessfully } from './reducers/comments';
import { makeFakeGuitars, makeFakeComments } from '../mock';
import { Comment } from '../types/types';

const GUITARS = 25;
const COMMENTS_COUNT = 7;

const fakeGuitars = makeFakeGuitars(GUITARS);
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
    await store.dispatch(fetchGuitarsAction('?_start=0&_limit=9'));
    store.dispatch(setTotalCounts(GUITARS));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(setTotalCounts.toString());
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
});
