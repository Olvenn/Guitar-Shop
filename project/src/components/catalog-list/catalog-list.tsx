import { useAppSelector } from '../../hooks/';
import { getGuitars } from '../../store/reducers/selectors';
import { CatalogItem } from '../catalog-item/catalog-item';
import { fetchGuitarsAction } from '../../store/api-actions';
import { store } from '../../store';
import { getCurrentPage } from '../../store/reducers/selectors';
import { ITEMS_PER_PAGE } from '../../const';

export function CatalogList(): JSX.Element {
  const currentPage = useAppSelector(getCurrentPage);
  store.dispatch(fetchGuitarsAction(`?_start=${currentPage}&_limit=${ITEMS_PER_PAGE}`));
  const guitars = useAppSelector(getGuitars);

  return (
    <div className="cards catalog__cards">
      {guitars.map((guitar) => (
        <CatalogItem
          key={guitar.id}
          guitar={guitar}
        />
      ))}
    </div>
  );
}
