import { useState } from 'react';
import { Modal } from '../../components/modal/modal';
import { SuccessReviewPopup } from '../../components/success-review-popup/success-review-popup';

type Props = {
  onClose: () => void;
}

export function ReviewPopup({ onClose }: Props): JSX.Element {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleModalClose = () => {
    setShowSuccessModal(false);
  };
  const handleModalOpen = () => {
    onClose();
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 1000);
  };

  return (
    <Modal onClose={onClose} >
      <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
      {showSuccessModal && (
        <SuccessReviewPopup onClose={handleModalClose} />
      )}
      <h3 className="modal__product-name title title--medium-20 title--uppercase">СURT Z30 Plus</h3>
      <form className="form-review">
        <div className="form-review__wrapper">
          <div className="form-review__name-wrapper">
            <label className="form-review__label form-review__label--required" htmlFor="user-name">
              Ваше Имя
            </label>
            <input className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" />
            <p className="form-review__warning">Заполните поле</p>
          </div>
          <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
            <div className="rate rate--reverse">
              <input className="visually-hidden" id="star-5" name="rate" type="radio" value="5" />
              <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
              <input className="visually-hidden" id="star-4" name="rate" type="radio" value="4" />
              <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
              <input className="visually-hidden" id="star-3" name="rate" type="radio" value="3" />
              <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
              <input className="visually-hidden" id="star-2" name="rate" type="radio" value="2" />
              <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
              <input className="visually-hidden" id="star-1" name="rate" type="radio" value="1" />
              <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
              <p className="rate__message">Поставьте оценку</p>
            </div>
          </div>
        </div>
        <label className="form-review__label form-review__label--required" htmlFor="adv">
          Достоинства
        </label>
        <input className="form-review__input" id="adv" type="text" autoComplete="off" />
        <p className="form-review__warning">Заполните поле</p>
        <label className="form-review__label form-review__label--required" htmlFor="disadv">
          Недостатки
        </label>
        <input className="form-review__input" id="disadv" type="text" autoComplete="off" />
        <p className="form-review__warning">Заполните поле</p>
        <label className="form-review__label form-review__label--required" htmlFor="comment">
          Комментарий
        </label>
        <textarea className="form-review__input form-review__input--textarea" id="comment" rows={10} autoComplete="off"></textarea>
        <p className="form-review__warning">Заполните поле</p>
        <a  onClick={handleModalOpen}  href='#'>
        <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
        </a>
      </form>
    </Modal>
  );
}
