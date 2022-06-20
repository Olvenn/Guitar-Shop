import { useAppSelector } from '../../hooks/';
import { getGuitar } from '../../store/reducers/selectors';
import { Modal } from '../../components/modal/modal';
import { ReviewForm } from '../../components/review-form/review-form';

type Props = {
  onClose: () => void;
  onReviewAdd: () => void;
}

export function ReviewModal({ onClose, onReviewAdd }: Props): JSX.Element {
  const guitar = useAppSelector(getGuitar);

  return (
    <div style={{ position: 'absolute', width: '550px', height: '610px', marginBottom: '50px' }}>
      <div className="modal is-active modal--review modal-for-ui-kit">
        <Modal onClose={onClose} >
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitar?.name}</h3>
          <ReviewForm onReviewAdd={onReviewAdd} />
        </Modal>
      </div>
    </div>
  );
}
