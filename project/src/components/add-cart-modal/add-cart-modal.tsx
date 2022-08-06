import { useAppDispatch } from '../../hooks';
import { Modal } from '../modal/modal';
import { getPictureNumber, adaptType } from '../../utils';
import { Guitar } from '../../types/types';
import { addGuitarToCart } from '../../store/reducers/cart';

type Props = {
  onClose: () => void;
  onGuitarAdd: () => void;
  guitar: Guitar;
}

export function AddCartModal({ onClose, onGuitarAdd, guitar }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addGuitarToCart(guitar.id));
    onGuitarAdd();
    onClose();
  };

  return (
    <div style={{ position: 'relative', width: '550px', height: '440px', marginBottom: '50px' }}>
      <div className="modal is-active">
        <Modal onClose={onClose}>
          <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
          <div className="modal__info">
            <img className="modal__img" style={{ width: '67px' }}
              src={`/img/content/catalog-product-${getPictureNumber(guitar.previewImg)}.jpg`}
              srcSet={`/img/content/catalog-product-${getPictureNumber(guitar.previewImg)}@2x.jpg 2x`}
              width="67" height="137" alt={`${guitar.name}`}
            />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">
                Гитара {guitar.name}
              </h3>
              <p className="modal__product-params modal__product-params--margin-11">
                Артикул: {`${guitar.vendorCode}`}
              </p>
              <p className="modal__product-params">
                {adaptType(guitar.type)}, {guitar.stringCount} струнная
              </p>
              <p className="modal__price-wrapper">
                <span className="modal__price">Цена:</span>
                <span className="modal__price">{`${guitar.price}`} ₽</span>
              </p>
            </div>
          </div>
          <div className="modal__button-container">
            <button onClick={handleAddToCart}
              className="button button--red button--big modal__button modal__button--add"
            >
              Добавить в корзину
            </button>
          </div>
          <button className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
          >
            <span className="button-cross__icon" />
            <span className="modal__close-btn-interactive-area" />
          </button>
        </Modal>
      </div>
    </div>
  );
}
export default AddCartModal;
