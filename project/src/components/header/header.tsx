import { Link } from 'react-router-dom';
import { MainNavList } from '../main-nav-list/main-nav-list';
import { AppRoute } from '../../const';

export function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to={AppRoute.Catalog}>
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
        </Link>
        {<MainNavList />}
        <div className="form-search">
          <form className="form-search__form" id="form-search">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search" />
              </svg>
              <span className="visually-hidden">Начать поиск</span>
            </button>
            <input className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?" />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul className="form-search__select-list hidden">
            <li className="form-search__select-item" tabIndex={0}>Четстер Plus</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX2</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX3</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX4</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX5</li>
          </ul>
          <button className="form-search__reset" type="reset" form="form-search">
            <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg><span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link className="header__cart-link" to={AppRoute.Cart} aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </Link>
      </div>
    </header>
  );
}
