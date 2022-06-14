import { Route, Routes } from 'react-router-dom';
import { CatalogPage } from '../../pages/сatalog-page/сatalog-page';
import { CartPage } from '../../pages/cart-page/cart-page';
import { ItemPage } from '../../pages/item-page/item-page';
import { AppRoute } from '../../const';
import { NotFoundPage } from '../../components/not-found-page/not-found-page';

export function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<CatalogPage />}
      />
      <Route
        path={AppRoute.Catalog}
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
