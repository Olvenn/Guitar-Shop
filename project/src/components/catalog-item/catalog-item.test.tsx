import * as Redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import { Routes, Route, generatePath } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { CatalogItem } from './catalog-item';
import { AppRoute, NameSpace } from '../../const';
import { makeFakeGuitar } from '../../mock';

const mockStore = configureMockStore();
const fakeGuitar = makeFakeGuitar();
const history = createMemoryHistory();

const store = mockStore({
  [NameSpace.Guitar]: {
    guitar: fakeGuitar,
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

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogItem guitar={fakeGuitar} />
        </HistoryRouter>;
      </Provider>,
    );

    expect(screen.getByText(/Всего оценок/i)).toBeInTheDocument();
    expect(screen.getByText(/₽/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Подробнее/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Купить/i })).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link Подробнее', () => {
    history.push('/fake');
    const linkSrc = generatePath(AppRoute.Item, { id: `${fakeGuitar.id}` });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={linkSrc}
              element={<h1>This is main page</h1>}
            />
            <Route
              path='*'
              element={<CatalogItem guitar={fakeGuitar} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Подробнее/i })).toBeInTheDocument();

    userEvent.click(screen.getByRole('link', { name: /Подробнее/i }));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});

