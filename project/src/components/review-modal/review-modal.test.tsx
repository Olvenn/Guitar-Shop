import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../const';
import { Provider } from 'react-redux';
import { ReviewModal } from './review-modal';
import { makeFakeGuitar } from '../../mock';
import * as Redux from 'react-redux';

const mockStore = configureMockStore();
const fakeGuitar = makeFakeGuitar();

describe('Component: ReviewModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const store = mockStore({
      [NameSpace.Guitar]: {
        guitar: fakeGuitar,
      },
      [NameSpace.Reviews]: {
        isLoading: true,
        isSuccessfully: false,
      },
    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewModal onClose={jest.fn()} onReviewAdd={jest.fn()} />
        </HistoryRouter>,
      </Provider>);

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });
});
