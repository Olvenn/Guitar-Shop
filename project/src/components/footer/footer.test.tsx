import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../const';
import { Footer } from './footer';
import { NameSpace } from '../../const';
import { Routes, Route } from 'react-router-dom';
import { makeFakeGuitars, GUITARS } from '../../mock';

const mockStore = configureMockStore();
const fakeGuitars = makeFakeGuitars(GUITARS);
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({
  [NameSpace.Guitar]: {
    guitar: fakeGuitars,
  },
});

describe('Component: footer', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<Footer />}
            />
          </Routes>
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
    expect(screen.getByText(/Режим работы/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Логотип/i })).toBeInTheDocument();
    // userEvent.click(screen.getByRole('link'));
  });
});
