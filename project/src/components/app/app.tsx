import { Route, Routes } from 'react-router-dom';
// import { useAppSelector } from '../../hooks';
import CatalogPage from '../../pages/сatalog-page/сatalog-page';
import ItemPage from '../../pages/item-page/item-page';
import CartPage from '../../pages/card-page/card-page';
import { AppRoute } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page';
// import LoadingScreen from '../loading-screen/loading-screen';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<CatalogPage />}
      />
      <Route
        path={AppRoute.Item}
        element={<ItemPage />}
      />
      <Route
        path={AppRoute.Cart}
        element={<CartPage />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}
export default App;


// function App(): JSX.Element {
//   return <p>Hello, world!</p>;
// }
// console.log('start');

// export default App;
