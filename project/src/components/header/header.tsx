import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/';
import { selectCartGuitarsIds } from '../../store/reducers/selectors';
import { MainNavList } from '../main-nav-list/main-nav-list';
import { Search } from '../search/search';
import { AppRoute } from '../../const';
import { useEffect } from 'react';
import { saveCart } from '../../services/cart';

export function Header(): JSX.Element {
  const guitarsIdsWithCount = useAppSelector(selectCartGuitarsIds);
  const cartGuitarCount = Object.values(guitarsIdsWithCount).reduce((sum, guitarCount) => sum + guitarCount, 0);

  useEffect(() => {
    saveCart(guitarsIdsWithCount);
  }, [guitarsIdsWithCount]);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to={AppRoute.Catalog}>
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
        </Link>
        <MainNavList />
        <Search />
        <Link id="cart"
          className="header__cart-link"
          to={AppRoute.Cart}
          aria-label="Корзина"
        >
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">{cartGuitarCount}</span>
        </Link>
      </div>
    </header>
  );
}
