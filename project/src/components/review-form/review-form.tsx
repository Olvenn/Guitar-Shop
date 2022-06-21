import { MouseEventHandler } from 'react';

type Props = {
  onReviewAdd: () => void;
}

export function ReviewForm({ onReviewAdd }: Props): JSX.Element {
  const handleReviewAdd: MouseEventHandler = (evt) => {
    evt.preventDefault();
    onReviewAdd();
  };

  return (
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
            <label className="rate__label" htmlFor="star-5" title="Отлично" />
            <input className="visually-hidden" id="star-4" name="rate" type="radio" value="4" />
            <label className="rate__label" htmlFor="star-4" title="Хорошо" />
            <input className="visually-hidden" id="star-3" name="rate" type="radio" value="3" />
            <label className="rate__label" htmlFor="star-3" title="Нормально" />
            <input className="visually-hidden" id="star-2" name="rate" type="radio" value="2" />
            <label className="rate__label" htmlFor="star-2" title="Плохо" />
            <input className="visually-hidden" id="star-1" name="rate" type="radio" value="1" />
            <label className="rate__label" htmlFor="star-1" title="Ужасно" />
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
      <button onClick={handleReviewAdd} className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
    </form>
  );
}
