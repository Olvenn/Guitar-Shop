import React, { MouseEventHandler, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/';
import { commentAction } from '../../store/api-actions';
import { setSuccessfully } from '../../store/reducers/comments';
import { getGuitar, setCommentSuccessfully } from '../../store/reducers/selectors';
import { RatingText, commentFieldsName } from '../../const';

const EMPTY_FIELD = 'Заполните поле';
const MIN_LENGTH_TEXT = 3;
const MAX_LENGTH_TEXT = 60;
const MIN_LENGTH_NAME = 20;
const MIN_LENGTH_COMMENT = 20;
const MAX_LENGTH_COMMENT = 120;

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
  const [userNameBlurred, setUserNameBlurred] = useState(false);
  const [advantagesBlurred, setAdvantagesBlurred] = useState(false);
  const [disadvantagesBlurred, setDisadvantagesBlurred] = useState(false);
  const [commentBlurred, setCommentBlurred] = useState(false);

  const ratingLength = Object.entries(RatingText).length + 1;

  const userNameLengthValid = userName.length < MIN_LENGTH_TEXT || userName.length > MIN_LENGTH_NAME;
  const advantagesLengthValid = advantages.length < MIN_LENGTH_TEXT || advantages.length > MAX_LENGTH_TEXT;
  const disadvantagesLengthValid = disadvantages.length < MIN_LENGTH_TEXT || disadvantages.length > MAX_LENGTH_TEXT;
  const commentValid = comment.length < MIN_LENGTH_COMMENT || comment.length > MAX_LENGTH_COMMENT;
  const rateValid = rate < 0;

  useEffect(() => {
    if (isSuccessfully) {
      onReviewAdd();
      dispatch(setSuccessfully(false));
    }
  }, [isSuccessfully, dispatch, onReviewAdd]);

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

  const handleBlurChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    switch (evt.target.name) {
      case commentFieldsName.UserName:
        setUserNameBlurred(true);
        break;
      case commentFieldsName.Adv:
        setAdvantagesBlurred(true);
        break;
      case commentFieldsName.Disadv:
        setDisadvantagesBlurred(true);
        break;
    }
  };

  const handleBlurTextareaChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentBlurred(true);
  };

  const handleRateChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRate(+evt.target.value);
  };

  const handleUserName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(evt.target.value);
  };

  const handleAdvantages = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setAdvantages(evt.target.value);
  };

  const handleDisadvantages = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDisadvantages(evt.target.value);
  };

  const handleComment = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  return (
    <form className="form-review" action="#" method="post">
      <div className="form-review__wrapper">
        <div className="form-review__name-wrapper">
          <label className="form-review__label form-review__label--required" htmlFor="user-name">
            Ваше Имя
          </label>
          <input onChange={handleUserName} onBlur={(evt) => handleBlurChange(evt)} value={userName} className="form-review__input form-review__input--name" id="user-name" name="user-name" type="text" autoComplete="off" data-testid="userName" />
          {(userNameBlurred && userName === '') && <p className="form-review__warning">{EMPTY_FIELD}</p>}
          {(userNameBlurred && userNameLengthValid) && <p className="form-review__warning">Имя должно быть от {MIN_LENGTH_TEXT} до {MIN_LENGTH_NAME} символов.</p>}
        </div>
        <div>
          <span className="form-review__label form-review__label--required">Ваша Оценка</span>
          <div className="rate rate--reverse">
            {
              (Object.entries(RatingText)).map(([value, label]) => (
                <React.Fragment key={label} >
                  <input onChange={handleRateChange} className="visually-hidden" id={`star-${ratingLength - (+value)}`} name="rate" type="radio" value={ratingLength - (+value)} />
                  <label className="rate__label" htmlFor={`star-${ratingLength - (+value)}`} title={label} />
                </React.Fragment>
              ))
            }
            {(rateValid || rate) === 0 && <p className="rate__message">Поставьте оценку</p>}
          </div>
        </div>
      </div>
      <label className="form-review__label form-review__label--required" htmlFor="adv">
        Достоинства
      </label>
      <input onChange={handleAdvantages} onBlur={(evt) => handleBlurChange(evt)} value={advantages} className="form-review__input" id="adv" name="adv" type="text" autoComplete="off" data-testid="adv" />
      {(advantagesBlurred && advantages === '') && <p className="form-review__warning">{EMPTY_FIELD}</p>}
      {(advantagesBlurred && advantagesLengthValid) && <p className="form-review__warning">Имя должно быть от {MIN_LENGTH_TEXT} до {MAX_LENGTH_TEXT} символов.</p>}
      <label className="form-review__label form-review__label--required" htmlFor="disadv">
        Недостатки
      </label>
      <input onChange={handleDisadvantages} onBlur={(evt) => handleBlurChange(evt)} value={disadvantages} className="form-review__input" id="disadv" name="disadv" type="text" autoComplete="off" data-testid="disadv" />
      {(disadvantagesBlurred && disadvantages === '') && <p className="form-review__warning">{EMPTY_FIELD}</p>}
      {(disadvantagesBlurred && disadvantagesLengthValid) && <p className="form-review__warning">Имя должно быть от {MIN_LENGTH_TEXT} до {MAX_LENGTH_TEXT} символов.</p>}
      <label className="form-review__label form-review__label--required" htmlFor="comment">
        Комментарий
      </label>
      <textarea onChange={handleComment} onBlur={(evt) => handleBlurTextareaChange(evt)} className="form-review__input form-review__input--textarea" id="comment" name="comment" rows={10} autoComplete="off" data-testid="comment" ></textarea>
      {(commentBlurred && comment === '') && <p className="form-review__warning">{EMPTY_FIELD}</p>}
      {(commentBlurred && commentValid) && <p className="form-review__warning">Комментарий должен быть от {MIN_LENGTH_COMMENT} до {MAX_LENGTH_COMMENT} символов.</p>}
      <button onClick={handleReviewAdd} className="button button--medium-20 form-review__button" type="submit" >Отправить отзыв</button>
    </form>
  );
}
