import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../const';
import { Header } from './header';
import { NameSpace } from '../../const';
import { Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { makeFakeGuitars, GUITARS } from '../../mock';

const mockStore = configureMockStore();
const fakeGuitars = makeFakeGuitars(GUITARS);
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({
  [NameSpace.Guitars]: {
    guitar: fakeGuitars,
    searchGuitars: [],
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
              element={<Header />}
            />
          </Routes>
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
  });

  it('should redirect to cart url when user clicked to "Перейти в корзину"', () => {
    history.push('/');
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Cart}
              element={<h1>This is cart page</h1>}
            />
            <Route
              path={AppRoute.Root}
              element={<Header />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>);

    expect(screen.queryByText(/This is cart page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Перейти в корзину/i));
    expect(screen.getByText(/This is cart page/i)).toBeInTheDocument();
  });
});


