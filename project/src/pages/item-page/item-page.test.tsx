import { render, screen } from '@testing-library/react';
import { generatePath, Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ItemPage } from './item-page';
import { AppRoute, NameSpace } from '../../const';
import { makeFakeGuitar } from '../../mock';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';

const mockStore = configureMockStore();
const fakeGuitar = makeFakeGuitar();
const history = createMemoryHistory();
const linkSrc = generatePath(AppRoute.Item, { id: `${fakeGuitar.id}` });
history.push(linkSrc);

const store = mockStore({
  [NameSpace.Guitar]: {
    guitar: fakeGuitar,
  },
  [NameSpace.Reviews]: {
    isLoading: true,
    isSuccessfully: true,
  },
});

describe('Component: ItemPage', () => {

  // const guitar = makeFakeGuitar();
  const dispatch = jest.fn();
  const useDispatch = jest.spyOn(Redux, 'useDispatch');
  useDispatch.mockReturnValue(dispatch);
  it('should render correctly when there is a guitar', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={linkSrc}
              element={<ItemPage />}
            />
          </Routes>
        </HistoryRouter>,
      </Provider >,
    );

    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Добавить в корзину/i })).toBeInTheDocument();
  });
});
