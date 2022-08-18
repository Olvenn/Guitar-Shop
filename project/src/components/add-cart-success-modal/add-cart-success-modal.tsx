import { useNavigate } from 'react-router-dom';
import { Modal } from '../modal/modal';
import { AppRoute } from '../../const';
import { startScroll } from '../../utils';

type Props = {
  onClose: () => void;
  id: number;
}

export function AddCartSuccessModal({ onClose, id }: Props): JSX.Element {
  const navigate = useNavigate();
  const handleCloseClick = async () => {
    onClose();
    startScroll();
  };

  const handleCartClick = async () => {
    navigate(AppRoute.Cart, { replace: true });
    onClose();
    startScroll();
  };

  return (
    <div style={{ position: 'absolute', width: '550px', height: '410px', marginBottom: '50px' }}>
      <div className="modal is-active modal--success">
        <Modal onClose={handleCloseClick} >
          <svg className="modal__icon" width="26" height="20" aria-hidden="true">
            <use xlinkHref="#icon-success" />
          </svg>
          <p className="modal__message" style={{ marginBottom: '32px' }}>Товар успешно добавлен в корзину</p>
          <div className="modal__button-container modal__button-container--add">
            <button
              onClick={handleCartClick}
              className="button button--small modal__button"
            >
              Перейти в корзину
            </button>
            <button
              onClick={handleCloseClick}
              className="button button--black-border button--small modal__button modal__button--right"
            >
              Продолжить покупки
            </button>
          </div>
        </Modal>
      </div>
    </div >
  );
}
