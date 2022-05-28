import { Route, Routes } from 'react-router-dom';
// import { useAppSelector } from '../../hooks';
import Catalog from '../main-page/main-page';
import Basket from '../basket/basket';
import Card from '../card/card';
import { AppRoute } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page';
// import LoadingScreen from '../loading-screen/loading-screen';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<Catalog />}
      />
      <Route
        path={AppRoute.Root}
        element={<Card />}
      />
      <Route
        path={AppRoute.Basket}
        element={<Basket />}
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
