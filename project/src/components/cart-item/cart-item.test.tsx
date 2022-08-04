import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { CartItem } from './cart-item';
import { AppRoute, NameSpace } from '../../const';
import { makeFakeGuitarsWithCount } from '../../mock';

const mockStore = configureMockStore();
const fakeGuitars = makeFakeGuitarsWithCount(5);
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({
  [NameSpace.Order]: {
    guitarWithCount: fakeGuitars,
  },
});

describe('Component: CartItem', () => {
  it('should render correctly one CartItem', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartItem guitarItem={fakeGuitars[0]} />
        </HistoryRouter>;
      </Provider>,
    );
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Удалить/i)).toBeInTheDocument();
  });
});

