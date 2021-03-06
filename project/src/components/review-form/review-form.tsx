import React, { MouseEventHandler, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/';
import { commentAction } from '../../store/api-actions';
import { setSuccessfully } from '../../store/reducers/comments';
import { getGuitar, getIsSuccessfullyComment } from '../../store/reducers/selectors';
import { RatingText, CommentFieldsName } from '../../const';

const EMPTY_FIELD = 'Заполните поле';

type Props = {
  onReviewAdd: () => void;
}

export function ReviewForm({ onReviewAdd }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const guitarId = useAppSelector(getGuitar)?.id;
  const isSuccessfully = useAppSelector(getIsSuccessfullyComment);

  const [userName, setUserName] = useState('');
  const [rate, setRate] = useState(0);
  const [advantages, setAdvantages] = useState('');
  const [disadvantages, setDisadvantages] = useState('');
  const [comment, setComment] = useState('');
  const [userNameBlurred, setUserNameBlurred] = useState(false);
  const [advantagesBlurred, setAdvantagesBlurred] = useState(false);
  const [disadvantagesBlurred, setDisadvantagesBlurred] = useState(false);
  const [commentBlurred, setCommentBlurred] = useState(false);

  const [isFormNotValid, setIsFormNotValid] = useState(false);
  const ratingLength = Object.entries(RatingText).length + 1;

  const rateValid = rate > 0;

  useEffect(() => {
    if (isSuccessfully) {
      onReviewAdd();
      dispatch(setSuccessfully(false));
    }
  }, [isSuccessfully, dispatch, onReviewAdd, guitarId]);

  const handleReviewAdd: MouseEventHandler = (evt) => {
    evt.preventDefault();

    setIsFormNotValid(true);
    setUserNameBlurred(true);
    setAdvantagesBlurred(true);
    setDisadvantagesBlurred(true);
    setCommentBlurred(true);

    if (guitarId && userName && advantages && disadvantages && comment && rateValid) {
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
      case CommentFieldsName.UserName:
        setUserNameBlurred(true);
        break;
      case CommentFieldsName.Adv:
        setAdvantagesBlurred(true);
        break;
      case CommentFieldsName.Disadv:
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
          <input
            onChange={handleUserName}
            onBlur={handleBlurChange}
            value={userName}
            className="form-review__input form-review__input--name"
            id={CommentFieldsName.UserName}
            name="user-name"
            type="text"
            autoComplete="off"
            data-testid="userName"
          />
          {(userNameBlurred && userName === '')
            ? <p className="form-review__warning">{EMPTY_FIELD}</p>
            : <p className="form-review__warning">&nbsp;</p>}
        </div>
        <div>
          <span className="form-review__label form-review__label--required">Ваша Оценка</span>
          <div className="rate rate--reverse">
            {
              (Object.entries(RatingText)).map(([value, label]) => (
                <React.Fragment key={label} >
                  <input onChange={handleRateChange}
                    className="visually-hidden"
                    id={`star-${ratingLength - (+value)}`}
                    name="rate" type="radio"
                    value={ratingLength - (+value)}
                  />
                  <label className="rate__label"
                    htmlFor={`star-${ratingLength - (+value)}`}
                    title={label}
                  />
                </React.Fragment>
              ))
            }
            {(isFormNotValid && rate === 0) && <p className="rate__message">Поставьте оценку</p>}
          </div>
        </div>
      </div>
      <label className="form-review__label form-review__label--required" htmlFor="adv">
        Достоинства
      </label>
      <input
        onChange={handleAdvantages}
        onBlur={handleBlurChange}
        value={advantages}
        className="form-review__input"
        id={CommentFieldsName.Adv}
        name="adv"
        type="text"
        autoComplete="off"
        data-testid="adv"
      />
      {(advantagesBlurred && advantages === '')
        ? <p className="form-review__warning">{EMPTY_FIELD}</p>
        : <p className="form-review__warning">&nbsp;</p>}
      <label className="form-review__label form-review__label--required" htmlFor="disadv">
        Недостатки
      </label>
      <input
        onChange={handleDisadvantages}
        onBlur={handleBlurChange}
        value={disadvantages}
        className="form-review__input"
        id={CommentFieldsName.Disadv}
        name="disadv"
        type="text"
        autoComplete="off"
        data-testid="disadv"
      />
      {(disadvantagesBlurred && disadvantages === '')
        ? <p className="form-review__warning">{EMPTY_FIELD}</p>
        : <p className="form-review__warning">&nbsp;</p>}
      <label className="form-review__label form-review__label--required" htmlFor="comment">
        Комментарий
      </label>
      <textarea
        onChange={handleComment}
        onBlur={handleBlurTextareaChange}
        className="form-review__input form-review__input--textarea"
        id="comment"
        name="comment"
        rows={10}
        autoComplete="off"
        data-testid="comment"
      />
      {(commentBlurred && comment === '')
        ? <p className="form-review__warning">{EMPTY_FIELD}</p>
        : <p className="form-review__warning">&nbsp;</p>}
      <button
        onClick={handleReviewAdd}
        className="button button--medium-20 form-review__button"
        type="submit"
      >
        Отправить отзыв
      </button>
    </form>
  );
}
