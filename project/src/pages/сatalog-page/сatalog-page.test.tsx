import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { CatalogPage } from './сatalog-page';
import { AppRoute, NameSpace } from '../../const';
import { makeFakeGuitars } from '../../mock';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const fakeGuitars = makeFakeGuitars(25).slice(6, 9);
const history = createMemoryHistory();
history.push(AppRoute.Catalog);

describe('Component: CatalogPage', () => {
  it('should render correctly when there is at least one guitar', () => {
    const store = mockStore({
      [NameSpace.Guitars]: {
        guitars: fakeGuitars,
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
