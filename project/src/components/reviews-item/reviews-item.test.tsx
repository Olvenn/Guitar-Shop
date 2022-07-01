import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { ReviewItem } from './reviews-item';
import { makeFakeReview } from '../../mock';

const mockStore = configureMockStore();
const fakeReview = makeFakeReview();
const history = createMemoryHistory();

describe('Component: ReviewItem', () => {
  it('should render correctly one guitar', () => {

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <ReviewItem review={fakeReview} />
        </HistoryRouter>;
      </Provider>,
    );

    expect(screen.getByText(/Достоинства:/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки:/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий:/i)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.userName)).toBeInTheDocument();
  });
});

