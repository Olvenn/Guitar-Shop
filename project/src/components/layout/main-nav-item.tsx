import { Link } from 'react-router-dom';

type MainNavItemProps = {
  item: string[];
  // onClick: (item: string) => void;
}

function MainNavItem({ item }: MainNavItemProps): JSX.Element {
  // const handleClick = () => {
  //   onClick(city);
  // };
  // eslint-disable-next-line no-console
  console.log(item);
  const tmpItemActive = 'Каталог';
  return (
    <li>
      <Link className={item[0] === tmpItemActive ? 'link main-nav__link link--current' : 'link main-nav__link'} to={item[1]}>{item[0]}</Link>
    </li>
  );
}
export default MainNavItem;

// <li onClick={handleClick} className="locations__item">
// <Link className={city === cityActive ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} to='/'>
//   <span>{city}</span>
// </Link>
// </li>
