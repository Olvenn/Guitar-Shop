import { render, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { AppRoute, NameSpace } from '../../const';
import userEvent from '@testing-library/user-event';
import { makeFakeGuitars, makeFakeGuitar, GUITARS } from '../../mock';
import { App } from './app';

const fakeGuitars = makeFakeGuitars(GUITARS);
const fakeGuitar = makeFakeGuitar();

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
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {

  it('should render "Root" when user navigate to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('should render "Catalog" when user navigate to "/catalog"', () => {
    history.push(AppRoute.Catalog);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('should render "Catalog" when user navigate to "/cart"', () => {
    history.push(AppRoute.Cart);

    render(fakeApp);

    expect(screen.getByText(/Скидка:/i)).toBeInTheDocument();
  });

  it('should render "Item" when user navigate to "/Item"', () => {
    const guitar = makeFakeGuitar();
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    history.push(AppRoute.Item.replace('id', guitar.id.toString()));

    render(fakeApp);
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    // expect(screen.getByText(guitar.name)).toBeInTheDocument();
  });


  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Back to main page')).toBeInTheDocument();
  });
});
