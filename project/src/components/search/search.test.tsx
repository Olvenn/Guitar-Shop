import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../const';
import { Search } from './search';
import { NameSpace } from '../../const';
import { Routes, Route } from 'react-router-dom';
import { makeFakeGuitars, GUITARS } from '../../mock';

const mockStore = configureMockStore();
const fakeGuitars = makeFakeGuitars(GUITARS);
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({
  [NameSpace.Guitars]: {
    guitar: fakeGuitars,
  },
});

describe('Component: header', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<Search />}
            />
          </Routes>
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/что вы ищите?/i)).toBeInTheDocument();
  });
});
