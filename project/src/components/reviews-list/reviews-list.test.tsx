import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { AppRoute, NameSpace } from '../../const';
import { makeFakeGuitars, GUITARS } from '../../mock';
import { ReviewList } from './reviews-list';

const mockStore = configureMockStore();
const fakeGuitars = makeFakeGuitars(GUITARS);
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({
  [NameSpace.Guitar]: {
    guitar: fakeGuitars,
  },
});

describe('Component: ReviewList', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewList guitar={fakeGuitars[0]} />
        </HistoryRouter>;
      </Provider>,
    );

    expect(screen.getByRole('button', { name: /Показать еще отзывы/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Оставить отзыв/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Наверх/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Оставить отзыв/i })).toBeInTheDocument();

    // expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });
});
