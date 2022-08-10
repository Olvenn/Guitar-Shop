import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { SuccessReviewModal } from './success-review-modal';
// import { AppRoute } from '../../const';

const id = 1;
const mockStore = configureMockStore();
const history = createMemoryHistory();
describe('Component: SuccessReviewModal', () => {
  it('should render correctly one guitar', () => {

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <SuccessReviewModal onClose={jest.fn()} id={id} />
        </HistoryRouter>;
      </Provider>,
    );

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /К покупкам!/i })).toBeInTheDocument();
  });
});
