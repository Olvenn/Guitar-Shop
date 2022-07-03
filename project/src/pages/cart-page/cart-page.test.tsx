import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { CartPage } from './cart-page';
import { AppRoute, NameSpace } from '../../const';
import { makeFakeGuitars } from '../../mock';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const fakeGuitars = makeFakeGuitars(25).slice(6, 9);
const history = createMemoryHistory();
history.push(AppRoute.Cart);


describe('Component: CartPage', () => {
  it('should render correctly when there is at least one guitar', () => {
    const store = mockStore({
      [NameSpace.Guitars]: {
        guitars: fakeGuitars,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartPage />
        </HistoryRouter>;
      </Provider>,
    );

    expect(screen.getByText(/Скидка:/i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Оформить заказ/i })).toBeInTheDocument();
  });
});
