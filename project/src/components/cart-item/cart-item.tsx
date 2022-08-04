import { useEffect, useState, ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks/';
import { GuitarWithCount } from '../../types/types';
import { capitalize, getPictureNumber } from '../../utils';
import { setGuitarCount } from '../../store/reducers/cart';

type CartItemProps = {
  guitarItem: GuitarWithCount;
}

export function CartItem({ guitarItem }: CartItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(guitarItem.count);
  const guitar = guitarItem.guitar;

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleInputNumber = (evt: ChangeEvent<HTMLInputElement>) => {
    setCount(Number(evt.target.value));
  };

  useEffect(() => {
    dispatch(setGuitarCount([guitar.id, count]));
  }, [count, dispatch, guitar.id]);

  return (
    <div className="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
      >
        <span className="button-cross__icon" />
        <span className="cart-item__close-button-interactive-area" />
      </button>
      <div className="cart-item__image">
        <img
          src={`img/content/catalog-product-${getPictureNumber(guitar.previewImg)}.jpg`}
          srcSet={`img/content/catalog-product-${getPictureNumber(guitar.previewImg)}@2x.jpg 2x`}
          width="55" height="130" alt="ЭлектроГитара Честер bass"
        />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{guitar.name}</p>
        <p className="product-info__info">Артикул: {guitar.vendorCode}</p>
        <p className="product-info__info">
          {capitalize(guitar.type)}, {guitar.stringCount} струнная
        </p>
      </div>
      <div className="cart-item__price">{guitar.price} ₽</div>
      <div className="quantity cart-item__quantity">
        <button onClick={handleDecrease} className="quantity__button" aria-label="Уменьшить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus" />
          </svg>
        </button>
        <input
          onChange={handleInputNumber}
          value={count}
          className="quantity__input"
          type="number"
          placeholder="1"
          id={`${guitar.id}-count`}
          name={`${guitar.id}-count`}
          max="99"
        />
        <button onClick={handleIncrease} className="quantity__button" aria-label="Увеличить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus" />
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{guitar.price * count} ₽</div>
    </div>
  );
}
