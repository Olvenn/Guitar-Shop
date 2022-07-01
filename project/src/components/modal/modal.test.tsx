import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { Modal } from './modal';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Modal onClose={jest.fn()}>
          <span>Something component</span>
        </Modal>
      </HistoryRouter>,
    );

    expect(screen.getByRole('button', { name: /Закрыть/i })).toBeInTheDocument();
  });
});
