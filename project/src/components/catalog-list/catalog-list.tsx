import { useAppSelector, useAppDispatch } from '../../hooks/';
import { getGuitars } from '../../store/reducers/selectors';
import { CatalogItem } from '../catalog-item/catalog-item';
import { fetchGuitarsAction } from '../../store/api-actions';
import { store } from '../../store';
import { ITEMS_PER_PAGE } from '../../const';
import { useEffect, useState } from 'react';
import { PaginationList } from '../pagination-list/pagination-list';

export function CatalogList(): JSX.Element {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    store.dispatch(fetchGuitarsAction(`?_start=${currentPage}&_limit=${ITEMS_PER_PAGE}`));
  }, [currentPage, dispatch]);

  const guitars = useAppSelector(getGuitars);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevClick = () => {
    setCurrentPage((prev) => prev - 1);
  };

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
          currentPage={currentPage}
          onPageClick={handlePageClick}
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
        />
      </div>
    </>
  );
}
