import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type PaginationItemProps = {
  page: number;
  currentPage: number;
  onPageClick: (page: number) => void;
}

export function PaginationItem({ page, currentPage, onPageClick }: PaginationItemProps): JSX.Element {
  const handleClick = () => {
    onPageClick(page);
  };

  return (
    <li className={`${page === currentPage ? 'pagination__page pagination__page--active' : 'pagination__page'}`} >
      <Link onClick={handleClick} className="link pagination__page-link" to={AppRoute.Catalog}>{page}</Link>
    </li>
  );
}
