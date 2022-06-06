import { Guitar } from '../../types/types';
import { firstToUpperCase, pictureNumber } from '../../utils';
import { useAppDispatch } from '../../hooks/';
import { fetchGuitarAction } from '../../store/api-actions';
import { loadGuitarId } from '../../store/reducers/guitars';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { generatePath } from 'react-router-dom';

type CatalogItemProps = {
  guitar: Guitar;
}

export function CatalogItem({ guitar }: CatalogItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const linkItem = generatePath(AppRoute.Item, { id: `${guitar.id}` });

  const handleItemClick = () => {
    dispatch(fetchGuitarAction(guitar.id));
    dispatch(loadGuitarId(guitar.id));
  };

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
        <p className="product-card__title">{guitar.name} {firstToUpperCase(guitar.type)}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {guitar.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link onClick={handleItemClick} className="button button--mini" to={linkItem}>Подробнее</Link>
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}
