import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/';
import { getTotalCounts } from '../../store/reducers/selectors';
import { ITEMS_PER_PAGE, AppRoute } from '../../const';

type Props = {
  currentPage: number,
}

export function PaginationList({ currentPage }: Props): JSX.Element {
  const guitarsCount = useAppSelector(getTotalCounts);
  const totalPagesCount = Math.ceil(guitarsCount / ITEMS_PER_PAGE);
  const pages = Array.from({ length: totalPagesCount }, (_, i) => i + 1);

  return (
    <ul className="pagination__list">
      <li className={currentPage === 1 ? 'pagination__page pagination__page--prev visually-hidden' : 'pagination__page pagination__page--prev'} id="prev">
        <Link className="link pagination__page-link" to={`${AppRoute.Catalog}/${currentPage - 1}`}>Назад</Link>
      </li>
      {pages.map((page) => (
        <li className={`${page === currentPage ? 'pagination__page pagination__page--active' : 'pagination__page'}`} key={page}>
          <Link className="link pagination__page-link" to={`${AppRoute.Catalog}/${page}`}>{page}</Link>
        </li>
      ))}
      <li className={currentPage === totalPagesCount ? 'pagination__page pagination__page--next visually-hidden' : 'pagination__page pagination__page--prev'} id="next">
        <Link className="link pagination__page-link" to={`${AppRoute.Catalog}/${currentPage + 1}`}>Далее</Link>
      </li>
    </ul>
  );
}
