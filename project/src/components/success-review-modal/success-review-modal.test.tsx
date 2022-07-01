import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { SuccessReviewModal } from './success-review-modal';
import { AppRoute } from '../../const';


const mockStore = configureMockStore();
const history = createMemoryHistory();
describe('Component: SuccessReviewModal', () => {
  it('should render correctly one guitar', () => {

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <SuccessReviewModal onClose={jest.fn()} />
        </HistoryRouter>;
      </Provider>,
    );

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /К покупкам!/i })).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link Подробнее', () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<h1>This is main page</h1>}
          />
          <Route
            path='*'
            element={<SuccessReviewModal onClose={jest.fn()} />}
          />
        </Routes>
      </HistoryRouter>);

    userEvent.click(screen.getByRole('button', { name: /К покупкам!/i }));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
