import { render, screen } from '@testing-library/react';
import { generatePath, Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ItemPage } from './item-page';
import userEvent from '@testing-library/user-event';
import { AppRoute, NameSpace } from '../../const';
import { makeFakeGuitars } from '../../mock';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const fakeGuitars = makeFakeGuitars(25);
const history = createMemoryHistory();
const linkSrc = generatePath(AppRoute.Item, { id: `${fakeGuitars[0].id}` });
history.push(linkSrc);

const store = mockStore({
  [NameSpace.Guitar]: {
    guitar: fakeGuitars[0],
  },
  [NameSpace.Reviews]: {
    isLoading: true,
    isSuccessfully: true,
  },
});


describe('Component: ItemPage', () => {
  it('should render correctly when there is at least one guitar', () => {


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

    // expect(screen.getByTitle('Корзина')).toBeInTheDocument();
    // expect(screen.getAllByRole('button')).toBeInTheDocument();
    // expect(screen.getByText(/Скидка:/i)).toBeInTheDocument();
    // expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: /Оформить заказ/i })).toBeInTheDocument();
  });
});

// import { render, screen } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
// import { Provider } from 'react-redux';
// import { configureMockStore } from '@jedmao/redux-mock-store';
// import HistoryRouter from '../../components/history-router/history-router';
// import { AppRoute, NameSpace } from '../../const';
// import { ItemPage } from './item-page';
// import { makeFakeGuitars, makeFakeGuitar, GUITARS } from '../../mock';
// import { Route, Routes } from 'react-router-dom';
// import * as Redux from 'react-redux';

// const fakeGuitars = makeFakeGuitars(GUITARS);
// const fakeGuitar = makeFakeGuitar();
// const mockStore = configureMockStore();
// const history = createMemoryHistory();

// history.push(`/item/${fakeGuitars[0].id}`);

// const store = mockStore({
//   [NameSpace.Guitar]: {
//     guitar: fakeGuitar,
//   },
//   [NameSpace.Guitars]: {
//     guitars: fakeGuitars,
//     totalCounts: GUITARS,
//   },

//   // [NameSpace.Reviews]: {
//   //   guitar: fakeGuitar,
//   //   loading: false,
//   //   error: false,
//   // },
//   [NameSpace.Reviews]: {
//     isLoading: true,
//     isSuccessfully: false,
//   },
// });

// describe('Component: Property', () => {

//   it('should render correctly property page', () => {
//     const dispatch = jest.fn();
//     const useDispatch = jest.spyOn(Redux, 'useDispatch');
//     useDispatch.mockReturnValue(dispatch);

//     render(
//       <Provider store={store}>
//         <HistoryRouter history={history}>
//           <Routes>
//             <Route
//               path={AppRoute.Item}
//               element={<ItemPage />}
//             />
//           </Routes>
//         </HistoryRouter>,
//       </Provider >,
//     );

//     // expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
//     // expect(screen.getByText(`${fakeGuitars[0].name}`)).toBeInTheDocument();
//   });
// });
