import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { CartItem } from './cart-item';
import { AppRoute, NameSpace } from '../../const';
import { makeFakeGuitars, GUITARS } from '../../mock';

const mockStore = configureMockStore();
const fakeGuitars = makeFakeGuitars(GUITARS);
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({
  [NameSpace.Guitar]: {
    guitar: fakeGuitars,
  },
});

describe('Component: CartItem', () => {
  it('should render correctly one CartItem', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartItem guitar={fakeGuitars[0]} />
        </HistoryRouter>;
      </Provider>,
    );
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakeGuitars[0].name}`)).toBeInTheDocument();
    expect(screen.getByLabelText(/Удалить/i)).toBeInTheDocument();
  });
});

