import React, { useState, useEffect, MouseEventHandler } from 'react';
import { store } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks/';
import { loadFilters } from '../../store/reducers/guitars';
import { MIN_PRICE, MAX_PRICE } from '../../const';
import { getFilters } from '../../store/reducers/selectors';

export function Filters(): JSX.Element {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState(useAppSelector(getFilters));

  const disabledTwelve = !(filters?.type?.includes('acoustic'));
  const disabledNotFore = ((filters?.type?.includes('ukulele')
    && !filters?.type?.includes('acoustic')
    && !filters?.type?.includes('electric')));

  const handleMinPriceClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const maxPrice = filters?.maxPrice;

    if (maxPrice) {
      const minPrice = Number(evt.target.value) > maxPrice ? maxPrice : Number(evt.target.value);
      setFilters({ ...filters, minPrice: minPrice });
    }
  };

  const handleMaxPriceClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const minPrice = filters?.minPrice;

    if (minPrice) {
      const maxPrice = Number(evt.target.value) < minPrice ? minPrice : Number(evt.target.value);
      setFilters({ ...filters, maxPrice: maxPrice });
    }
  };

  const handleTypeCheckboxChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    if (evt.target.checked) {
      if (!filters?.type?.includes(name)) {
        const types = `${filters?.type}&type=${name}`;
        setFilters({ ...filters, type: types });
      }
    } else {
      const types = `&type=${name}`;
      setFilters({ ...filters, type: filters?.type?.replace(types, '') });
    }
  };

  const handleStringsCheckboxChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const index = evt.target.id.indexOf('-');
    const count = evt.target.id.slice(0, index);

    if (evt.target.checked) {
      if (!filters?.strings?.includes(count)) {
        const counts = `${filters?.strings}&stringCount=${count}`;
        setFilters({ ...filters, strings: counts });
      }
    } else {
      const counts = `&stringCount=${count}`;
      setFilters({ ...filters, strings: filters?.strings?.replace(counts, '') });
    }
  };

  const [clearCheckbox, setClearCheckbox] = useState(false);

  const handleClearBtnClick: MouseEventHandler = () => {
    setClearCheckbox(false);
    setFilters({
      minPrice: MIN_PRICE,
      maxPrice: MAX_PRICE,
      type: '',
      strings: '',
    });
  };

  useEffect(() => {
    store.dispatch(loadFilters(filters));
  }, [filters, dispatch]);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              onChange={handleMinPriceClick}
              value={filters?.minPrice}
              type="number"
              placeholder={MIN_PRICE.toString()}
              id="priceMin"
              name="от"
              min={MIN_PRICE}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              value={filters?.maxPrice}
              type="number" placeholder={MAX_PRICE.toString()}
              id="priceMax"
              name="до"
              onChange={handleMaxPriceClick}
              max={MAX_PRICE}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            defaultChecked={clearCheckbox}
            type="checkbox"
            id="acoustic"
            name="acoustic"
            onChange={handleTypeCheckboxChange}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            defaultChecked={clearCheckbox}
            type="checkbox"
            id="electric"
            name="electric"
            onChange={handleTypeCheckboxChange}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            defaultChecked={clearCheckbox}
            type="checkbox"
            id="ukulele"
            name="ukulele"
            onChange={handleTypeCheckboxChange}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            onChange={handleStringsCheckboxChange}
            defaultChecked={clearCheckbox}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            onChange={handleStringsCheckboxChange}
            disabled={disabledNotFore}
            defaultChecked={clearCheckbox}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            onChange={handleStringsCheckboxChange}
            disabled={disabledNotFore}
            defaultChecked={clearCheckbox}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            disabled={!disabledTwelve || disabledNotFore}
            onChange={handleStringsCheckboxChange}
            defaultChecked={clearCheckbox}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button
        onClick={handleClearBtnClick}
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
      >
        Очистить
      </button>
    </form>
  );
}
