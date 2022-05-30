import { useAppSelector } from '../../hooks/';
// import CitiesList from '../cities-list/cities-list';
import { getReviews } from '../../store/reducers/selectors';
import ReviewItem from '../reviews-item/reviews-item';

function ReviewList(): JSX.Element {
  const reviews = useAppSelector(getReviews);
  // console.log('reviews', reviews);

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>

      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
        />
      ))}

      <button className="button button--medium reviews__more-button">Показать еще отзывы</button><a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>

    </section>
  );
}
export default ReviewList;

