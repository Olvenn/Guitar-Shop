import { Review } from '../../types/types';

type ReviewsItemProps = {
  review: Review;
}

export function ReviewItem({ review }: ReviewsItemProps): JSX.Element {

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{review.userName}</h4>
        <span className="review__date">{review.createAt}</span>
      </div>
      <div className="rate review__rating-panel">
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star" />
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star" />
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star" />
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star" />
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-star" />
        </svg>
        <p className="visually-hidden">Оценка: Хорошо</p>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{review.advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{review.disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{review.comment}</p>
    </div>
  );
}
