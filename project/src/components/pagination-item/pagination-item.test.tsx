import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { PaginationItem } from './pagination-item';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: PaginationItem', () => {
  it('should render correctly', () => {
    const page = 1;
    const currentPage = 1;
    render(
      <HistoryRouter history={history}>
        <PaginationItem onPageClick={jest.fn()} page={page} currentPage={currentPage} />
      </HistoryRouter>);

    expect(screen.getByText(page)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('onPageClick should called when user click pagination item', () => {
    const currentPage = 1;
    const onPageClick = jest.fn();
    const page = 1;

    render(
      <HistoryRouter history={history}>
        <PaginationItem onPageClick={onPageClick} page={page} currentPage={currentPage} />
      </HistoryRouter>);

    userEvent.click(screen.getByRole('link'));
    expect(onPageClick).toBeCalledTimes(1);
  });
});
