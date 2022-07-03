import { useNavigate } from 'react-router-dom';
import { Modal } from '../../components/modal/modal';
import { startBodyScroll } from '../../utils';

type SuccessReviewModalProps = {
  onClose: () => void;
}

export function SuccessReviewModal({ onClose }: SuccessReviewModalProps): JSX.Element {
  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate('/', { replace: true });
    startBodyScroll();
  };

  return (
    <Modal onClose={onClose} >
      <svg className="modal__icon" width="26" height="20" aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <p className="modal__message">Спасибо за ваш отзыв!</p>
      <div className="modal__button-container modal__button-container--review">
        <button onClick={handleCloseClick} className="button button--small modal__button modal__button--review">
          К покупкам!
        </button>
      </div>
    </Modal>
  );
}
