import React, { MouseEventHandler, useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/';
import { store } from '../../store';
import { loadSort } from '../../store/reducers/guitars';

export function Sorting(): JSX.Element {
  const dispatch = useAppDispatch();

  const [price, setPrice] = useState(false);
  const [rate, setRate] = useState(false);
  const [asc, setAsc] = useState(false);
  const [desc, setDesc] = useState(false);

  const handlePriceBtnClick: MouseEventHandler = () => {
    if (!price && !rate) {
      setPrice(!price);
      setAsc(!asc);
    } else {
      setPrice(!price);
      setRate(!rate);
    }
  };
  const handleRateBtnClick: MouseEventHandler = () => {
    if (!price && !rate) {
      setRate(!rate);
      setAsc(!asc);
    } else {
      setPrice(!price);
      setRate(!rate);
    }
  };

  const handleAscBtnClick: MouseEventHandler = () => {
    if (!price && !asc && !rate && !desc) {
      setAsc(!asc);
      setPrice(!price);
    } else {
      setAsc(!asc);
      setDesc(!desc);
    }
  };
  const handleDescBtnClick: MouseEventHandler = () => {
    if (!price && !asc && !rate && !desc) {
      setDesc(!desc);
      setPrice(!price);
    } else {
      setDesc(!desc);
      setAsc(!asc);
    }
  };
  // eslint-disable-next-line no-console
  console.log('price', price, 'rate', rate, 'asc', asc, 'desc', desc);

  useEffect(() => {
    if (asc && !rate) {
      store.dispatch(loadSort('?_sort=price&_order=asc&'));
    }
    if (desc && !rate) {
      store.dispatch(loadSort('?_sort=price&_order=desc&'));
    }
    if (desc && !price) {
      store.dispatch(loadSort('?_sort=rating&_order=desc&'));
    }
    if (asc && !price) {
      store.dispatch(loadSort('?_sort=rating&_order=asc&'));
    }
  }, [price, rate, asc, desc, dispatch]);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button onClick={handlePriceBtnClick} className={`${price ? 'catalog-sort__type-button catalog-sort__type-button--active' : 'catalog-sort__type-button'}`} aria-label="по цене">по цене</button>
        <button onClick={handleRateBtnClick} className={`${rate ? 'catalog-sort__type-button catalog-sort__type-button--active' : 'catalog-sort__type-button'}`} aria-label="по популярности">по популярности</button>
      </div>
      <div className="catalog-sort__order">
        <button onClick={handleAscBtnClick} className={`${asc ? 'catalog-sort__order-button catalog-sort__order-button--up' : 'catalog-sort__order-button catalog-sort__order-button--up'}`} aria-label="По возрастанию"></button>
        <button onClick={handleDescBtnClick} className={`${desc ? 'catalog-sort__order-button catalog-sort__order-button--down' : 'catalog-sort__order-button catalog-sort__order-button--down'}`} aria-label="По убыванию"></button>
      </div>
    </div >
  );
}
