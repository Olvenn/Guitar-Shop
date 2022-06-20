import { MouseEventHandler, FormEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { getSuccessfully } from '../../store/reducers/selectors';
import { setSuccessfully } from '../../store/reducers/guitars';

type Props = {
  onReviewAdd: () => void;
}

export function ReviewForm({ onReviewAdd }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState('');
  const [rate, setRate] = useState(0);
  const [advantages, setAdvantages] = useState('');
  const [disadvantages, setDisadvantages] = useState('');
  const [comment, setComment] = useState('');
  const [userNameWasBlur, setUserNameWasBlur] = useState(false);
  const [advantagesWasBlur, setAdvantagesWasBlur] = useState(false);
  const [disadvantagesWasBlur, setDisadvantagesWasBlur] = useState(false);
  const [commentWasBlur, setCommentWasBlur] = useState(false);
  const [userNameError, setUserNameError] = useState('Заполните поле');
  const [rateError, setRateError] = useState('Поставьте оценку');
  const [advantagesError, setAdvantagesError] = useState('Заполните поле');
  const [disadvantagesError, setDisadvantagesError] = useState('Заполните поле');
  const [commentError, setCommentError] = useState('Заполните поле');

  const isS = useAppSelector(getSuccessfully);
  console.log(isS);

  const handleReviewAdd: MouseEventHandler = (evt) => {
    evt.preventDefault();
    onReviewAdd();
  };

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
    setRateError('');
  };

  const handlerUserName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(evt.target.value);
    if (evt.target.value.length < 3 || evt.target.value.length > 20) {
      setUserNameError('Имя должно быть от 3 до 20 символов.');
      if (!evt.target.value) {
        setUserNameError('Заполните поле');
      }
    } else {
      setUserNameError('');
    }
  };

  const handlerAdvantages = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setAdvantages(evt.target.value);
    if (evt.target.value.length < 7 || evt.target.value.length > 120) {
      setAdvantagesError('Имя должно быть от 7 до 120 символов.');
      if (!evt.target.value) {
        setAdvantagesError('Заполните поле');
      }
    } else {
      setAdvantagesError('');
    }
  };

  const handlerDisadvantages = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDisadvantages(evt.target.value);
    if (evt.target.value.length < 7 || evt.target.value.length > 120) {
      setDisadvantagesError('Имя должно быть от 7 до 120 символов.');
      if (!evt.target.value) {
        setDisadvantagesError('Заполните поле');
      }
    } else {
      setDisadvantagesError('');
    }
  };

  const handlerComment = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
    if (evt.target.value.length < 100 || evt.target.value.length > 320) {
      setCommentError('Имя должно быть от 100 до 320 символов.');
      if (!evt.target.value) {
        setCommentError('Заполните поле');
      }
    } else {
      setCommentError('');
    }
  };

  const onSubmit = (success: number) => {
    dispatch(setSuccessfully(success));
    // eslint-disable-next-line no-console
    console.log('dddd');
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (rate !== null && comment !== '' && advantages !== '' && disadvantages !== '' && comment !== '') {
      // eslint-disable-next-line no-console
      console.log(rate, comment, advantages, disadvantages, comment);
    }
    onSubmit(2);
  };

  return (
    <form onSubmit={handleSubmit} className="form-review" action="#" method="post">
      <div className="form-review__wrapper">
        <div className="form-review__name-wrapper">
          <label className="form-review__label form-review__label--required" htmlFor="user-name">
            Ваше Имя
          </label>
          <input onChange={(evt) => handlerUserName(evt)} onBlur={(evt) => handleBlurChange(evt)} value={userName} className="form-review__input form-review__input--name" id="user-name" name="user-name" type="text" autoComplete="off" />
          {(userNameWasBlur && userNameError) && <p className="form-review__warning">{userNameError}</p>}
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
            {(rateError) && <p className="rate__message">Поставьте оценку</p>}
          </div>
        </div>
      </div>
      <label className="form-review__label form-review__label--required" htmlFor="adv">
        Достоинства
      </label>
      <input onChange={(evt) => handlerAdvantages(evt)} onBlur={(evt) => handleBlurChange(evt)} value={advantages} className="form-review__input" id="adv" name="adv" type="text" autoComplete="off" />
      {(advantagesWasBlur && advantagesError) && <p className="form-review__warning">{advantagesError}</p>}
      <label className="form-review__label form-review__label--required" htmlFor="disadv">
        Недостатки
      </label>
      <input onChange={(evt) => handlerDisadvantages(evt)} onBlur={(evt) => handleBlurChange(evt)} value={disadvantages} className="form-review__input" id="disadv" name="disadv" type="text" autoComplete="off" />
      {(disadvantagesWasBlur && disadvantagesError) && <p className="form-review__warning">{disadvantagesError}</p>}
      <label className="form-review__label form-review__label--required" htmlFor="comment">
        Комментарий
      </label>
      <textarea onChange={handlerComment} onBlur={(evt) => handleBlurTextareaChange(evt)} className="form-review__input form-review__input--textarea" id="comment" name="comment" rows={10} autoComplete="off"></textarea>
      {(commentWasBlur && commentError) && <p className="form-review__warning">{commentError}</p>}
      <a onClick={handleReviewAdd} href='#'>
        <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
      </a>
    </form>
  );
}
