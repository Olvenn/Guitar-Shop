import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'querystring';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { getGuitars, getFilters, selectSort, selectPage } from '../../store/reducers/selectors';
import { CatalogItem } from '../catalog-item/catalog-item';
import { fetchGuitarsAction } from '../../store/api-actions';
import { PaginationList } from '../pagination-list/pagination-list';
import { getIsLoadingGuitars } from '../../store/reducers/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { AppRoute } from '../../const';
import { setPage } from '../../store/reducers/guitars';

export function CatalogList(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoading = useAppSelector(getIsLoadingGuitars);
  const guitars = useAppSelector(getGuitars);
  const filters = useAppSelector(getFilters);
  const page = useAppSelector(selectPage);
  const sort = useAppSelector(selectSort);

  useEffect(() => {
    dispatch(fetchGuitarsAction());
  }, [dispatch, location]);

  useEffect(() => {
    dispatch(setPage(1));
    const query = queryString.stringify({ page, ...sort, ...filters });
    navigate(`${AppRoute.Catalog}/#${query}`);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, filters]);

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
        <PaginationList />
      </div>
    </>
  );
}
