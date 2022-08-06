import { useState, useEffect } from 'react';
import { generatePath } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { Guitar } from '../../types/types';
import { getPictureNumber, ratingValues } from '../../utils';
import { AppRoute } from '../../const';
import { AddCartModal } from '../add-cart-modal/add-cart-modal';
import { AddCartSuccessModal } from '../add-cart-success-modal/add-cart-success-modal';
import { selectCartGuitarsIds } from '../../store/reducers/selectors';

type CatalogItemProps = {
  guitar: Guitar;
}

export function CatalogItem({ guitar }: CatalogItemProps): JSX.Element {
  const guitarsIds = useAppSelector(selectCartGuitarsIds);
  const [showAddCartModal, setShowAddCartModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const linkSrc = generatePath(AppRoute.Item, { id: `${guitar.id}` });
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (Object.keys(guitarsIds)?.includes(String(guitar.id))) {
      setIsInCart(true);
    }
  }, [guitar.id, guitarsIds]);


  const handleAddCartAdd = () => {
    setShowAddCartModal(true);
  };

  const handleAddCartModalClose = () => {
    setShowAddCartModal(false);
  };

  const handleGuitarAdd = () => {
    setShowAddCartModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      {showAddCartModal && (
        <AddCartModal onClose={handleAddCartModalClose} guitar={guitar} onGuitarAdd={handleGuitarAdd} />
      )}
      {showSuccessModal && (
        <AddCartSuccessModal onClose={handleSuccessModalClose} id={guitar.id} />
      )}
      <div className="product-card">
        <img
          src={`/img/content/catalog-product-${getPictureNumber(guitar.previewImg)}.jpg`}
          srcSet={`/img/content/catalog-product-${getPictureNumber(guitar.previewImg)}@2x.jpg 2x`}
          width="75" height="190" alt={`${guitar.name} ${guitar.name}`}
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
          <Link
            onClick={handleAddCartAdd}
            className={`${!isInCart ? 'button button--red button--mini button--add-to-cart' : 'button button--red-border button--mini button--in-cart'}`}
            to="#"
          >
            Купить
          </Link>
        </div>
      </div>
    </>
  );
}
