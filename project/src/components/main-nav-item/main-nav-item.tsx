import { Link } from 'react-router-dom';

type MainNavItemProps = {
  item: string[];
  // onClick: (item: string) => void;
}

function MainNavItem({ item }: MainNavItemProps): JSX.Element {
  const tmpItemActive = 'Каталог';
  return (
    <li>
      <Link className={item[0] === tmpItemActive ? 'link main-nav__link link--current' : 'link main-nav__link'} to={item[1]}>{item[0]}</Link>
    </li>
  );
}
export default MainNavItem;
