import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../const';
import { Provider } from 'react-redux';
import { DeleteModal } from './delete-modal';
import { makeFakeGuitar } from '../../mock';
import * as Redux from 'react-redux';

const mockStore = configureMockStore();
const fakeGuitar = makeFakeGuitar();

describe('Component: AddCartModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const store = mockStore({
      [NameSpace.Guitar]: {
        guitar: fakeGuitar,
      },
    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <DeleteModal onClose={jest.fn()} guitar={fakeGuitar} />
        </HistoryRouter>,
      </Provider>);

    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
  });
});
