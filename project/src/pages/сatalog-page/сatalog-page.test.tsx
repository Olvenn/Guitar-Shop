import { render, screen } from '@testing-library/react';
import { generatePath } from 'react-router-dom';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { CatalogPage } from './сatalog-page';
import { AppRoute, NameSpace } from '../../const';
import { makeFakeGuitars, GUITARS } from '../../mock';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const fakeGuitars = makeFakeGuitars(GUITARS).slice(6, 9);
const history = createMemoryHistory();
const linkSrc = generatePath(AppRoute.Catalog);
history.push(linkSrc);

describe('Component: CatalogPage', () => {
  it('should render correctly when there is at least one guitar', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({
      [NameSpace.Guitars]: {
        guitars: fakeGuitars,
        isLoading: false,
        totalCounts: 0,
        searchGuitars: [],
      },
      [NameSpace.Cart]: {
        guitars: [],
        guitarIdsWithCount: { 1: 1 },
        loading: false,
        error: undefined,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogPage />
        </HistoryRouter>;
      </Provider>,
    );

    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Главная/i })).toBeInTheDocument();
  });
});
