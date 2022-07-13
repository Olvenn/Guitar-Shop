import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../const';
import { Provider } from 'react-redux';
import { PaginationList } from './pagination-list';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: PaginationList', () => {
  it('should render correctly', () => {
    const currentPage = 1;
    const store = mockStore({
      [NameSpace.Guitars]: {
        totalCounts: 10,
      },
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PaginationList currentPage={currentPage} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByRole('link', { name: /Назад/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Далее/i })).toBeInTheDocument();
  });
});
