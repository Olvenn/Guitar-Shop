import { rating } from '../../utils';

type RaitingProps = {
  ratingCount: number;
}

export function Raiting({ ratingCount }: RaitingProps): JSX.Element {
  return (
    <>
      {
        rating.map((item) => (
          <svg key={item} width="16" height="16" aria-hidden="true">
            {ratingCount > item ? <use xlinkHref="#icon-full-star" /> : <use xlinkHref="#icon-star" />}
          </svg>
        ))
      }
    </>
  );
}
