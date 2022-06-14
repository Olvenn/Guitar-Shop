import { useAppSelector } from '../../hooks/';
import { getReviews } from '../../store/reducers/selectors';
import { ReviewItem } from '../reviews-item/reviews-item';
import { useState, useEffect } from 'react';

import { Modal } from '../../components/modal/modal';
import { SuccessReviewPopup } from '../../components/success-review-popup/success-review-popup';

import { useNavigate } from 'react-router-dom';

export function ReviewList(): JSX.Element {
  const reviews = useAppSelector(getReviews);
  const REVIEW_PRE_PAGE = 3;

  const [startReview, setstartReview] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(reviews.length);

  const handleUpClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    setstartReview(0);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setReviewsCount(reviews.length);
  };

  useEffect(() => {
    setReviewsCount(reviews.length);
  }, [reviews]);

  const handleMoreClick = () => {
    setstartReview(startReview + REVIEW_PRE_PAGE);
    setReviewsCount(reviewsCount - REVIEW_PRE_PAGE);
  };

  const [isActive, setIsActive] = useState(false);
  const handleModalClick = () => {
    setIsActive(true);
  };

  const navigate = useNavigate();

  const handleCloseClick = () => {
    setIsActive(false);
    navigate('/', { replace: true });
  };

  return (
    <section className="reviews">
      <Modal isActive={isActive} setIsActive={setIsActive}>
        <SuccessReviewPopup onModalClick={handleCloseClick} />
      </Modal>
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a onClick={handleModalClick} className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>
      {reviews.slice(startReview, (startReview + REVIEW_PRE_PAGE)).map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
        />
      ))}
      {(reviewsCount > REVIEW_PRE_PAGE) && <button onClick={handleMoreClick} className="button button--medium reviews__more-button">Показать еще отзывы</button>}
      <a style={{ zIndex: '100' }} onClick={handleUpClick} className="button button--up button--red-border button--big reviews__up-button" href="#">Наверх</a>
    </section>
  );
}

