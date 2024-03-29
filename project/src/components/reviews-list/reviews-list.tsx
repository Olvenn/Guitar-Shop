import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Guitar } from '../../types/types';
import { ReviewItem } from '../reviews-item/reviews-item';
import { ReviewModal } from '../review-modal/review-modal';
import { SuccessReviewModal } from '../success-review-modal/success-review-modal';
import { sortByDateAsc, stopBodyScroll, startBodyScroll } from '../../utils';

type Props = {
  guitar: Guitar,
}

const REVIEW_PRE_PAGE = 3;

export function ReviewList({ guitar }: Props): JSX.Element {
  const [isUp, setIsUp] = useState(false);
  const [startReview, setStartReview] = useState(REVIEW_PRE_PAGE);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const reviews = (guitar.comments?.map((item) => item))?.sort(sortByDateAsc);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setIsUp(false);
  }, [isUp]);

  useEffect(() => {
    if (reviews) {
      setReviewsCount(reviews?.length);
    }
  }, [reviews]);

  const handleUpClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    setStartReview(REVIEW_PRE_PAGE);
    setIsUp(true);
  };

  const handleMoreClick = () => {
    setStartReview(startReview + REVIEW_PRE_PAGE);
  };

  const handleReviewModalOpen = () => {
    setShowAddReviewModal(true);
    stopBodyScroll();
  };

  const handleReviewModalClose = () => {
    setShowAddReviewModal(false);
    startBodyScroll();
  };

  const handleReviewAdd = () => {
    setShowAddReviewModal(false);
    setShowSuccessModal(true);
    stopBodyScroll();
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    startBodyScroll();
  };

  return (
    <section className="reviews">
      {showAddReviewModal && (
        <ReviewModal onClose={handleReviewModalClose} onReviewAdd={handleReviewAdd} />
      )}
      {showSuccessModal && (
        <SuccessReviewModal onClose={handleSuccessModalClose} id={guitar.id} />
      )}
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <Link
        onClick={handleReviewModalOpen}
        className="button button--red-border button--big reviews__sumbit-button"
        to="#"
      >
        Оставить отзыв
      </Link>
      {reviews?.slice(0, startReview).map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
        />
      ))}
      {((reviewsCount - startReview) > 0) &&
        <button
          onClick={handleMoreClick}
          className="button button--medium reviews__more-button"
        >
          Показать еще отзывы
        </button>}
      <Link style={{ zIndex: '100' }}
        onClick={handleUpClick}
        className="button button--up button--red-border button--big reviews__up-button"
        to="#"
      >
        Наверх
      </Link>
    </section>
  );
}

