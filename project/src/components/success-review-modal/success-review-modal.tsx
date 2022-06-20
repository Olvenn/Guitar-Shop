import { useNavigate } from 'react-router-dom';
import { Modal } from '../../components/modal/modal';

type SuccessReviewModalProps = {
  onClose: () => void;
}

export function SuccessReviewModal({ onClose }: SuccessReviewModalProps): JSX.Element {
  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate('/', { replace: true });
  };

  return (
    <div style={{ position: 'absolute', width: '550px', height: '410px', marginBottom: '50px' }}>
      <div className="is-active modal modal--success modal-for-ui-kit">
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
      </div>
    </div>
  );
}
