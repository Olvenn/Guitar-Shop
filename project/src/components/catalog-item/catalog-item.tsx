import { generatePath } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Guitar } from '../../types/types';
import { getPictureNumber, ratingValues } from '../../utils';
import { AppRoute } from '../../const';

type CatalogItemProps = {
  guitar: Guitar;
}

export function CatalogItem({ guitar }: CatalogItemProps): JSX.Element {
  const linkSrc = generatePath(AppRoute.Item, { id: `${guitar.id}` });

  return (
    <div className="product-card">
      <img
        src={`/img/content/catalog-product-${getPictureNumber(guitar.previewImg)}.jpg`}
        srcSet={`/img/content/catalog-product-${getPictureNumber(guitar.previewImg)}@2x.jpg 2x`}
        width="75" height="190" alt={`${guitar.name}`}
      />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            ratingValues.map((item) => (
              <svg key={item} width="12" height="11" aria-hidden="true">
                {Math.floor(guitar.rating) > item
                  ? <use xlinkHref="#icon-full-star" />
                  : <use xlinkHref="#icon-star" />}
              </svg>
            ))
          }
          <p className="visually-hidden">Рейтинг: Хорошо</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>
            {guitar.comments?.length ? guitar.comments?.length : 0}
          </p>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {guitar.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={linkSrc}>Подробнее</Link>
        <Link className="button button--red button--mini button--add-to-cart" to="#">
          Купить
        </Link>
      </div>
    </div>
  );
}
