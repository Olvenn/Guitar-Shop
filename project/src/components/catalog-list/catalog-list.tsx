import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { store } from '../../store';
import { ITEMS_PER_PAGE } from '../../const';
import { getGuitars } from '../../store/reducers/selectors';
import { CatalogItem } from '../catalog-item/catalog-item';
import { fetchGuitarsAction } from '../../store/api-actions';
import { PaginationList } from '../pagination-list/pagination-list';

export function CatalogList(): JSX.Element {
  const dispatch = useAppDispatch();
  const { page = 1 } = useParams<{ page: string }>();

  const guitars = useAppSelector(getGuitars);

  useEffect(() => {
    store.dispatch(fetchGuitarsAction(`?_start=${page}&_limit=${ITEMS_PER_PAGE}`));
  }, [page, dispatch]);

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
