import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-router/history-router';
import { Filters } from './filters';
import { NameSpace } from '../../const';

const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.Guitars]: {
    guitars: [],
    totalCounts: 0,
  },
});

describe('Component: Filters', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Filters />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
  });

  it('should print pirce correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Filters />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByTestId(/priceMin/i)).toBeInTheDocument();
    expect(screen.getByTestId(/priceMax/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('priceMin'), '1000');
    userEvent.type(screen.getByTestId('priceMax'), '2000');

    expect(screen.getByDisplayValue(/1000/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/2000/i)).toBeInTheDocument();
  });
});
