import { Review } from '../../types/types';
import { Raiting } from '../../components/rating/rating';
import { Months } from '../../const';

type ReviewsItemProps = {
  review: Review;
}

export function ReviewItem({ review }: ReviewsItemProps): JSX.Element {
  const reviewData = new Date(review.createAt);
  const reviewDay = reviewData.getDate();
  const reviewMonth = Months[reviewData.getMonth()];

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{review.userName}</h4>
        <span className="review__date">{reviewDay} {reviewMonth}</span>
      </div>
      <div className="rate review__rating-panel">
        <Raiting ratingCount={review.rating} />
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
