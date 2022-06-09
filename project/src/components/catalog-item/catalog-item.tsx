import { Guitar } from '../../types/types';
import { capitalize, pictureNumber } from '../../utils';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { generatePath } from 'react-router-dom';

type CatalogItemProps = {
  guitar: Guitar;
}

export function CatalogItem({ guitar }: CatalogItemProps): JSX.Element {
  const linkSrc = generatePath(AppRoute.Item, { id: `${guitar.id}` });

  return (
    <div className="product-card">
      <img src={`img/content/catalog-product-${pictureNumber(guitar.previewImg)}.jpg`} srcSet={`img/content/catalog-product-${pictureNumber(guitar.previewImg)}@2x.jpg 2x`} width="75" height="190" alt={`${guitar.name}`} />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-star" />
          </svg>
          <p className="visually-hidden">Рейтинг: Хорошо</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>
            9
          </p>
        </div>
        <p className="product-card__title">{guitar.name} {capitalize(guitar.type)}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {guitar.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={linkSrc}>Подробнее</Link>
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}
