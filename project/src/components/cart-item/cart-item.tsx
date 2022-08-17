import { ChangeEvent, useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/';
import { Guitar } from '../../types/types';
import { capitalize, getPictureNumber } from '../../utils';
import { setGuitarCount, increaseGuitarsCount, decreaseGuitarsCount } from '../../store/reducers/cart';
import { DeleteModal } from '../delete-modal/delete-modal';

type CartItemProps = {
  guitar: Guitar;
  count: number;
}

export function CartItem({ guitar, count }: CartItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [valueInput, setValueInput] = useState(count);

  const handleIncrease = () => {
    dispatch(increaseGuitarsCount(guitar.id));
    setValueInput(valueInput + 1);
  };

  const handleDecrease = () => {
    if (count > 1) {
      dispatch(decreaseGuitarsCount(guitar.id));
      setValueInput(valueInput - 1);
    } else {
      setDeleteModal(true);
    }
  };

  useEffect(() => {
    dispatch(setGuitarCount({ guitarId: guitar.id, count: valueInput }));
  }, [dispatch, valueInput, guitar.id, count]);


  const handleInputNumber = (evt: ChangeEvent<HTMLInputElement>) => {
    if (+evt.target.value !== 0) {
      setValueInput(Number(evt.target.value));
    }
  };

  const handleDeleteModalAdd = () => {
    setDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModal(false);
  };

  return (
    <div className="cart-item">
      {showDeleteModal && (
        <DeleteModal onClose={handleDeleteModalClose} guitar={guitar} />
      )}
      <button
        onBlur={handleDeleteModalAdd}
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
          width="55" height="130" alt={`${capitalize(guitar.type)}`}
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
          value={valueInput}
          className="quantity__input"
          type="number"
          placeholder="1"
          id={`${guitar.id}-count`}
          name={`${guitar.id}-count`}
          max="99"
          min="1"
        />
        <button onClick={handleIncrease} className="quantity__button" aria-label="Увеличить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus" />
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{guitar.price * count} ₽</div>
    </div >
  );
}
