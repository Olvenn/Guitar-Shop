import { Route, Routes } from 'react-router-dom';
import { CatalogPage } from '../../pages/сatalog-page/сatalog-page';
import { CartPage } from '../../pages/cart-page/cart-page';
import { ItemPage } from '../../pages/item-page/item-page';
import { AppRoute } from '../../const';
import { ITEMS_PER_PAGE } from '../../const';
import { fetchGuitarsAction } from '../../store/api-actions';
import { store } from '../../store';
import { useAppSelector } from '../../hooks/';
import { getCurrentPage } from '../../store/reducers/selectors';

export function App(): JSX.Element {
  const currentPage = useAppSelector(getCurrentPage);
  store.dispatch(fetchGuitarsAction(`?_start=${currentPage}&_limit=${ITEMS_PER_PAGE}`));

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
    </Routes>
  );
}
