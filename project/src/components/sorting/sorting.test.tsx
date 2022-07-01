import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { Sorting } from './sorting';

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Sorting />
      </HistoryRouter>,
    );

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /по цене/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /по популярности/i })).toBeInTheDocument();
  });
});
