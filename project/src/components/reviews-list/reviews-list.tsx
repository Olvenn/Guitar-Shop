import { useAppSelector } from '../../hooks/';
import { getReviews } from '../../store/reducers/selectors';
import { ReviewItem } from '../reviews-item/reviews-item';
import { useState, useEffect } from 'react';

// import { SuccessReviewPopup } from '../../components/success-review-popup/success-review-popup';
import { ReviewPopup } from '../../components/review-popup/review-popup';

export function ReviewList(): JSX.Element {
  const reviews = useAppSelector(getReviews);
  const REVIEW_PRE_PAGE = 3;

  const [isUp, setisUp] = useState(false);
  const [startReview, setstartReview] = useState(REVIEW_PRE_PAGE);
  const [reviewsCount, setReviewsCount] = useState(0);

  const handleUpClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    setstartReview(REVIEW_PRE_PAGE);
    setisUp(true);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setisUp(false);
  }, [isUp]);

  useEffect(() => {
    setReviewsCount(reviews.length);
  }, [reviews]);

  const handleMoreClick = () => {
    setstartReview(startReview + REVIEW_PRE_PAGE);
  };

  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleReviewModalClose = () => {
    setShowReviewModal(false);
  };

  const handleReviewModalOpen = () => {
    setShowReviewModal(true);
  };

  return (
    <section className="reviews">
      {showReviewModal && (
        <div style={{ position: 'relative', width: '550px', height: '610px', marginBottom: '50px' }}>
          <div className="modal is-active modal--review modal-for-ui-kit">
            <ReviewPopup onClose={handleReviewModalClose} />
          </div>
        </div>
      )}
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a onClick={handleReviewModalOpen} className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>
      {reviews.slice(0, startReview).map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
        />
      ))}
      {(reviewsCount !== startReview) && <button onClick={handleMoreClick} className="button button--medium reviews__more-button">Показать еще отзывы</button>}
      <a style={{ zIndex: '100' }} onClick={handleUpClick} className="button button--up button--red-border button--big reviews__up-button" href="#">Наверх</a>
    </section>
  );
}

