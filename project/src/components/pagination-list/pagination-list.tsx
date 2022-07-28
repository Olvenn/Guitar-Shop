import { useAppDispatch, useAppSelector } from '../../hooks/';
import { getTotalCounts, selectPage } from '../../store/reducers/selectors';
import { ITEMS_PER_PAGE } from '../../const';
import { setPage } from '../../store/reducers/guitars';
import { Link } from 'react-router-dom';

export function PaginationList(): JSX.Element {
  const dispatch = useAppDispatch();
  const guitarsCount = useAppSelector(getTotalCounts);
  const currentPage = useAppSelector(selectPage);

  const totalPagesCount = Math.ceil(guitarsCount / ITEMS_PER_PAGE);
  const pages = Array.from({ length: totalPagesCount }, (_, i) => i + 1);

  const handlePageClick = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <ul className="pagination__list">
      <li className={currentPage === 1 ? 'pagination__page pagination__page--prev visually-hidden' : 'pagination__page pagination__page--prev'} id="prev">
        <Link
          className="link pagination__page-link"
          onClick={() => handlePageClick(currentPage - 1)}
          to='#'
        >
          Назад
        </Link>
      </li>
      {pages.map((page) => (
        <li
          className={`${page === currentPage ? 'pagination__page pagination__page--active' : 'pagination__page'}`} key={page}
        >
          <Link
            className="link pagination__page-link"
            onClick={() => handlePageClick(page)}
            to='#'
          >
            {page}
          </Link>
        </li>
      ))}
      <li
        className={currentPage === totalPagesCount ? 'pagination__page pagination__page--next visually-hidden' : 'pagination__page pagination__page--prev'} id="next"
      >
        <Link
          className="link pagination__page-link"
          onClick={() => handlePageClick(currentPage + 1)}
          to='#'
        >
          Далее
        </Link>
      </li>
    </ul>
  );
}
