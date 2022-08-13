import * as Redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { CartList } from './cart-list';
import { NameSpace } from '../../const';
import { makeFakeGuitars, GUITARS } from '../../mock';

const mockStore = configureMockStore();
const fakeGuitars = makeFakeGuitars(GUITARS);
const history = createMemoryHistory();

const store = mockStore({
  [NameSpace.Guitars]: {
    guitars: fakeGuitars,
  },
  [NameSpace.Cart]: {
    guitars: [],
    guitarIdsWithCount: { 1: 1 },
    loading: false,
    error: undefined,
  },
});

describe('Component: CatalogItem', () => {
  it('should render correctly one guitar', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartList />
        </HistoryRouter>;
      </Provider>,
    );

    expect(screen.getByTestId(/cart/i)).toBeInTheDocument();
  });
});

