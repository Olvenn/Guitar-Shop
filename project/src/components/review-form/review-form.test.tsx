import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-router/history-router';
import { ReviewForm } from './review-form';
import { NameSpace } from '../../const';

const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.Guitars]: {
    guitars: [],
    totalCounts: 0,
  },
  [NameSpace.Guitar]: {
    guitar: undefined,
    loading: false,
    error: undefined,
  },
  [NameSpace.Reviews]: {
    isLoading: true,
    isSuccessfully: false,
  },
});

describe('Component: ReviewForm', () => {
  it('should render "ReviewForm" when user get form', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm onReviewAdd={jest.fn()} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Ваша Оценка/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('userName'), 'keks');
    userEvent.type(screen.getByTestId('disadv'), '123456');

    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});
