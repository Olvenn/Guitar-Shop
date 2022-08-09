import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { CartItem } from './cart-item';
import { AppRoute, NameSpace } from '../../const';
import { makeFakeGuitars } from '../../mock';

const mockStore = configureMockStore();
const COUNT = 3;
const fakeGuitars = makeFakeGuitars(COUNT);
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({
  [NameSpace.Cart]: {
    guitarWithCount: fakeGuitars,
  },
});

describe('Component: CartItem', () => {
  it('should render correctly one CartItem', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartItem guitar={fakeGuitars[0]} count={COUNT} />
        </HistoryRouter>;
      </Provider>,
    );
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Удалить/i)).toBeInTheDocument();
  });
});

