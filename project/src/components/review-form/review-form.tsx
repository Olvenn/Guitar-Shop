import { MouseEventHandler, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/';
import { commentAction } from '../../store/api-actions';
import { setSuccessfully } from '../../store/reducers/comments';
import { getGuitar, setCommentSuccessfully } from '../../store/reducers/selectors';

type Props = {
  onReviewAdd: () => void;
}

export function ReviewForm({ onReviewAdd }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const guitarId = useAppSelector(getGuitar)?.id;
  const isSuccessfully = useAppSelector(setCommentSuccessfully);

  const [userName, setUserName] = useState('');
  const [rate, setRate] = useState(0);
  const [advantages, setAdvantages] = useState('');
  const [disadvantages, setDisadvantages] = useState('');
  const [comment, setComment] = useState('');
  const [userNameWasBlur, setUserNameWasBlur] = useState(false);
  const [advantagesWasBlur, setAdvantagesWasBlur] = useState(false);
  const [disadvantagesWasBlur, setDisadvantagesWasBlur] = useState(false);
  const [commentWasBlur, setCommentWasBlur] = useState(false);

  const EMPTY_FIELD = 'Заполните поле';
  const userNameLengthValid = userName.length < 3 || userName.length > 20;
  const advantagesLengthValid = advantages.length < 3 || advantages.length > 60;
  const disadvantagesLengthValid = disadvantages.length < 3 || disadvantages.length > 60;
  const commentValid = comment.length < 20 || comment.length > 120;
  const rateValid = rate < 0;

  const handleReviewAdd: MouseEventHandler = (evt) => {
    evt.preventDefault();
    if (guitarId && !userNameLengthValid && !advantagesLengthValid && !disadvantagesLengthValid && !commentValid && !rateValid) {
      dispatch(commentAction({
        guitarId,
        userName,
        advantage: advantages,
        disadvantage: disadvantages,
        comment,
        rating: rate,
      }));
    }
  };

  useEffect(() => {
    if (isSuccessfully) {
      onReviewAdd();
      dispatch(setSuccessfully(false));
    }
  }, [isSuccessfully, dispatch, onReviewAdd]);

  const handleBlurChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    switch (evt.target.name) {
      case 'user-name':
        setUserNameWasBlur(true);
        break;
      case 'adv':
        setAdvantagesWasBlur(true);
        break;
      case 'disadv':
        setDisadvantagesWasBlur(true);
        break;
    }
  };

  const handleBlurTextareaChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentWasBlur(true);
  };

  const handleRateChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRate(+evt.target.value);
  };

  const handlerUserName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(evt.target.value);
  };

  const handlerAdvantages = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setAdvantages(evt.target.value);
  };

  const handlerDisadvantages = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDisadvantages(evt.target.value);
  };

  const handlerComment = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  return (
    <form className="form-review" action="#" method="post">
      <div className="form-review__wrapper">
        <div className="form-review__name-wrapper">
          <label className="form-review__label form-review__label--required" htmlFor="user-name">
            Ваше Имя
          </label>
          <input onChange={(evt) => handlerUserName(evt)} onBlur={(evt) => handleBlurChange(evt)} value={userName} className="form-review__input form-review__input--name" id="user-name" name="user-name" type="text" autoComplete="off" />
          {(userNameWasBlur && userName === '') && <p className="form-review__warning">{EMPTY_FIELD}</p>}
          {(userNameWasBlur && userNameLengthValid) && <p className="form-review__warning">Имя должно быть от 3 до 20 символов.</p>}
        </div>
        <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
          <div className="rate rate--reverse">
            <input onChange={(evt) => handleRateChange(evt)} className="visually-hidden" id="star-5" name="rate" type="radio" value="5" />
            <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
            <input onChange={(evt) => handleRateChange(evt)} className="visually-hidden" id="star-4" name="rate" type="radio" value="4" />
            <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
            <input onChange={(evt) => handleRateChange(evt)} className="visually-hidden" id="star-3" name="rate" type="radio" value="3" />
            <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
            <input onChange={(evt) => handleRateChange(evt)} className="visually-hidden" id="star-2" name="rate" type="radio" value="2" />
            <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
            <input onChange={(evt) => handleRateChange(evt)} className="visually-hidden" id="star-1" name="rate" type="radio" value="1" />
            <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
            {(rateValid || rate) === 0 && <p className="rate__message">Поставьте оценку</p>}
          </div>
        </div>
      </div>
      <label className="form-review__label form-review__label--required" htmlFor="adv">
        Достоинства
      </label>
      <input onChange={(evt) => handlerAdvantages(evt)} onBlur={(evt) => handleBlurChange(evt)} value={advantages} className="form-review__input" id="adv" name="adv" type="text" autoComplete="off" />
      {(advantagesWasBlur && advantages === '') && <p className="form-review__warning">{EMPTY_FIELD}</p>}
      {(advantagesWasBlur && advantagesLengthValid) && <p className="form-review__warning">Имя должно быть от 3 до 60 символов.</p>}
      <label className="form-review__label form-review__label--required" htmlFor="disadv">
        Недостатки
      </label>
      <input onChange={(evt) => handlerDisadvantages(evt)} onBlur={(evt) => handleBlurChange(evt)} value={disadvantages} className="form-review__input" id="disadv" name="disadv" type="text" autoComplete="off" />
      {(disadvantagesWasBlur && disadvantages === '') && <p className="form-review__warning">{EMPTY_FIELD}</p>}
      {(disadvantagesWasBlur && disadvantagesLengthValid) && <p className="form-review__warning">Имя должно быть от 3 до 60 символов.</p>}
      <label className="form-review__label form-review__label--required" htmlFor="comment">
        Комментарий
      </label>
      <textarea onChange={handlerComment} onBlur={(evt) => handleBlurTextareaChange(evt)} className="form-review__input form-review__input--textarea" id="comment" name="comment" rows={10} autoComplete="off"></textarea>
      {(commentWasBlur && comment === '') && <p className="form-review__warning">{EMPTY_FIELD}</p>}
      {(commentWasBlur && commentValid) && <p className="form-review__warning">Имя должно быть от 20 до 120 символов.</p>}
      <button onClick={handleReviewAdd} className="button button--medium-20 form-review__button" type="submit" >Отправить отзыв</button>
    </form>
  );
}
