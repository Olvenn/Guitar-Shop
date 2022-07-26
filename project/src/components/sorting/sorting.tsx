import { MouseEventHandler, useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/';
import { setSort } from '../../store/reducers/guitars';
import { SortType, SortOrder } from '../../const';

export function Sorting(): JSX.Element {
  const dispatch = useAppDispatch();
  const [sortType, setSortType] = useState(SortType.Default);
  const [sortOrder, setSortOrder] = useState(SortOrder.Asc);

  const handlePriceButtonClick: MouseEventHandler = () => {
    setSortType(SortType.Price);
  };

  const handleRateButtonClick: MouseEventHandler = () => {
    setSortType(SortType.Rate);
  };

  const handleAscButtonClick: MouseEventHandler = () => {
    if (sortType === 'default') {
      setSortType(SortType.Price);
      setSortOrder(SortOrder.Asc);
    } else {
      setSortOrder(SortOrder.Asc);
    }
  };

  const handleDescButtonClick: MouseEventHandler = () => {
    setSortOrder(SortOrder.Desc);
  };

  useEffect(() => {
    dispatch(setSort({ sortType, sortOrder }));
  }, [sortType, sortOrder, dispatch]);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          onClick={handlePriceButtonClick}
          className={`${sortType === SortType.Price
            ? 'catalog-sort__type-button catalog-sort__type-button--active'
            : 'catalog-sort__type-button'}`}
          aria-label="по цене"
        >
          по цене
        </button>
        <button
          onClick={handleRateButtonClick}
          className={`${sortType === SortType.Rate
            ? 'catalog-sort__type-button catalog-sort__type-button--active'
            : 'catalog-sort__type-button'}`} aria-label="по популярности"
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          onClick={handleAscButtonClick}
          className={`${sortOrder === SortOrder.Asc && sortType !== SortType.Default
            ? 'catalog-sort__order-button--active catalog-sort__order-button catalog-sort__order-button--up'
            : 'catalog-sort__order-button catalog-sort__order-button--up'}`}
          aria-label="По возрастанию"
        />
        <button
          onClick={handleDescButtonClick}
          className={`${sortOrder === SortOrder.Desc
            ? 'catalog-sort__order-button--active catalog-sort__order-button catalog-sort__order-button--down'
            : 'catalog-sort__order-button catalog-sort__order-button--down'}`}
          aria-label="По убыванию"
        />
      </div>
    </div >
  );
}
