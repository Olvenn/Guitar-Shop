import { useNavigate } from 'react-router-dom';
import { Modal } from '../modal/modal';
import { startBodyScroll } from '../../utils';
import { useAppDispatch } from '../../hooks/';
import { fetchGuitarAction } from '../../store/reducers/guitar';

type SuccessReviewModalProps = {
  onClose: () => void;
  id: number;
}

export function SuccessReviewModal({ onClose, id }: SuccessReviewModalProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCloseClick = async () => {
    await dispatch(fetchGuitarAction(+id));
    navigate(`/item/${id}`, { replace: true });
    startBodyScroll();
    onClose();
  };

  return (
    <div style={{ position: 'absolute', width: '550px', height: '410px', marginBottom: '50px' }}>
      <div className="is-active modal modal--success modal-for-ui-kit">
        <Modal onClose={handleCloseClick} >
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
    </div >
  );
}
