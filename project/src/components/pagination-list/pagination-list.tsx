import { useAppSelector } from '../../hooks/';
import { getTotalCounts } from '../../store/reducers/selectors';
import { ITEMS_PER_PAGE } from '../../const';
import { PaginationItem } from '../pagination-item/pagination-item';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

type Props = {
  currentPage: number,
  onPageClick: (page: number) => void,
  onPrevClick: () => void,
  onNextClick: () => void,
}

export function PaginationList({ currentPage, onPageClick, onPrevClick, onNextClick }: Props): JSX.Element {
  const guitarsCount = useAppSelector(getTotalCounts);
  const totalPagesCount = Math.ceil(guitarsCount / ITEMS_PER_PAGE);
  const pages = Array.from({ length: totalPagesCount }, (_, i) => i + 1);

  return (
    <ul className="pagination__list">
      <li className={currentPage === 1 ? 'pagination__page pagination__page--prev visually-hidden' : 'pagination__page pagination__page--prev'} id="prev">
        <Link onClick={onPrevClick} className="link pagination__page-link" to={AppRoute.Catalog}>Назад</Link>
      </li>
      {pages.map((page) => (
        <PaginationItem
          key={page}
          page={page}
          currentPage={currentPage}
          onPageClick={onPageClick}
        />
      ))}
      <li className={currentPage === totalPagesCount ? 'pagination__page pagination__page--next visually-hidden' : 'pagination__page pagination__page--prev'} id="next">
        <Link onClick={onNextClick} className="link pagination__page-link" to={AppRoute.Catalog}>Далее</Link>
      </li>
    </ul>
  );
}
