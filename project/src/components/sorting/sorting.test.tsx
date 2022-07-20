import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { Sorting } from './sorting';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { NameSpace } from '../../const';

const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.Guitars]: {
    guitars: [],
    totalCounts: 0,
  },
});

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Sorting />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /по цене/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /по популярности/i })).toBeInTheDocument();
  });
});
