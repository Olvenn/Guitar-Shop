import { useAppSelector, useAppDispatch } from '../../hooks/';
import { getGuitars } from '../../store/reducers/selectors';
import { CatalogItem } from '../catalog-item/catalog-item';
import { fetchGuitarsAction } from '../../store/api-actions';
import { store } from '../../store';
import { getTotalCounts } from '../../store/reducers/selectors';
import { ITEMS_PER_PAGE } from '../../const';
import { useEffect, useState } from 'react';
import { PaginationItem } from '../pagination-item/pagination-item';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';


export function CatalogList(): JSX.Element {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const guitarsCount = useAppSelector(getTotalCounts);
  const numberOfPages = Math.ceil(guitarsCount / ITEMS_PER_PAGE);
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);

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
        <ul className="pagination__list">
          <li className={currentPage === 1 ? 'pagination__page pagination__page--prev visually-hidden' : 'pagination__page pagination__page--prev'} id="prev">
            <Link onClick={handlePrevClick} className="link pagination__page-link" to={AppRoute.Catalog}>Назад</Link>
          </li>
          {pages.map((page) => (
            <PaginationItem
              key={page}
              page={page}
              currentPage={currentPage}
              onPageClick={handlePageClick}
            />
          ))}
          <li className={currentPage === numberOfPages ? 'pagination__page pagination__page--next visually-hidden' : 'pagination__page pagination__page--prev'} id="next">
            <Link onClick={handleNextClick} className="link pagination__page-link" to={AppRoute.Catalog}>Далее</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
