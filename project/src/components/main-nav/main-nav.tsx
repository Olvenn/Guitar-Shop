import { mainNavItems } from '../../const';
import MainNavItem from '../main-nav-item/main-nav-item';

function MainNavList(): JSX.Element {
  // eslint-disable-next-line no-console
  console.log(mainNavItems);
  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        {(Object.entries(mainNavItems)).map(([key, item]) => (
          // <li key={key} ><a className="link main-nav__link link--current" href="#">{item}</a>
          // </li>
          <MainNavItem
            key={key}
            item={item}
          // onClick={handleCityClick}
          // cityActive={town}
          />
        ))}

      </ul>
    </nav>
  );
}
export default MainNavList;
