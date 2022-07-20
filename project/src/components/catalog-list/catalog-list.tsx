import { useEffect } from 'react';
import { useParams, generatePath, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { store } from '../../store';
import { ITEMS_PER_PAGE } from '../../const';
import { getGuitars, getFilters, selectSort } from '../../store/reducers/selectors';
import { CatalogItem } from '../catalog-item/catalog-item';
import { fetchGuitarsAction } from '../../store/api-actions';
import { PaginationList } from '../pagination-list/pagination-list';
import { getIsLoadingGuitars } from '../../store/reducers/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { AppRoute } from '../../const';

export function CatalogList(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getIsLoadingGuitars);
  const guitars = useAppSelector(getGuitars);
  const filters = useAppSelector(getFilters);
  const sort = useAppSelector(selectSort);

  const { page = 1 } = useParams<{ page: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    store.dispatch(fetchGuitarsAction(`${sort}price_gte=${filters?.minPrice}&price_lte=${filters?.maxPrice}${filters?.strings}${filters?.type}&_start=${(+page - 1) * ITEMS_PER_PAGE}&_limit=${ITEMS_PER_PAGE}${filters?.strings}`));
  }, [page, dispatch, filters, sort, navigate]);

  useEffect(() => {
    const linkSrc = generatePath(AppRoute.Catalog, { id: '1' });
    navigate(linkSrc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort]);

  if (!isLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <>
      <div className="cards catalog__cards">
        {guitars.map((guitar) => (
          <CatalogItem
            key={guitar.id}
            guitar={guitar}
          />
        ))}
      </div>
      <div className="pagination page-content__pagination">
        <PaginationList
          currentPage={Number(page)}
        />
      </div>
    </>
  );
}
