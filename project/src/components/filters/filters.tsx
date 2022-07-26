import { useState, useEffect, MouseEventHandler, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/';
import { loadFilters, defaultFilters } from '../../store/reducers/guitars';
import { MIN_PRICE, MAX_PRICE } from '../../const';
import { selectMinPrice, selectMaxPrice } from '../../store/reducers/selectors';


export function Filters(): JSX.Element {
  const dispatch = useAppDispatch();

  const startMinPrice = useAppSelector(selectMinPrice);
  const startMaxPrice = useAppSelector(selectMaxPrice);

  const [filters, setFilters] = useState(defaultFilters);
  const [clearCheckbox, setClearCheckbox] = useState(false);

  const [minPrice, setMinPrice] = useState(startMinPrice);
  const [maxPrice, setMaxPrice] = useState(startMaxPrice);

  useEffect(() => {
    setMinPrice(startMinPrice);
    setMaxPrice(startMaxPrice);
  }, [startMinPrice, startMaxPrice]);


  const disabledUkulele = ((filters?.type?.includes('ukulele')
    && !filters?.type?.includes('acoustic')
    && !filters?.type?.includes('electric')));
  const disabledElectric = ((filters?.type?.includes('electric')
    && !filters?.type?.includes('acoustic')));
  const disabledAcoustic = ((filters?.type?.includes('acoustic')
    && !filters?.type?.includes('electric')));

  const handleMinPriceClick = (evt: ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(evt.target.value));
  };

  const handleMaxPriceClick = (evt: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(evt.target.value));
  };

  const handleMinPriceOnBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    if (minPrice > maxPrice) {
      setMinPrice(maxPrice);
    }
    setFilters({ ...filters, minPrice: Number(minPrice) });
  };

  const handleMaxPriceOnBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    if (minPrice > maxPrice) {
      setMinPrice(maxPrice);
    }
    setFilters({ ...filters, maxPrice: Number(maxPrice) });
  };

  // useEffect(() => {
  //   if (minPrice < maxPrice) {
  //     setFilters({ ...filters, minPrice: Number(minPrice) });
  //   }
  // }, [minPrice]);

  // useEffect(() => {
  //   if (minPrice < maxPrice) {
  //     setFilters({ ...filters, maxPrice: Number(maxPrice) });
  //   }
  // }, [maxPrice]);

  // const handleMinPriceClick = (evt: ChangeEvent<HTMLInputElement>) => {
  //   const maxPrice = filters?.maxPrice;

  //   if (maxPrice) {
  //     const minPrice = Number(evt.target.value) > maxPrice ? maxPrice : Number(evt.target.value);
  //     setFilters({ ...filters, minPrice: Number(minPrice) });
  //   }
  // };

  // const handleMaxPriceClick = (evt: ChangeEvent<HTMLInputElement>) => {
  //   const minPrice = filters?.minPrice;

  //   if (minPrice) {
  //     const maxPrice = Number(evt.target.value) < minPrice ? minPrice : Number(evt.target.value);
  //     setFilters({ ...filters, maxPrice: Number(maxPrice) });
  //   }
  // };

  const handleTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
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

  const handleStringsCheckboxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const index = evt.target.id.indexOf('-');
    const count = evt.target.id.slice(0, index);

    if (evt.target.checked) {
      if (!filters?.stringsCount?.includes(count)) {
        const counts = `${filters?.stringsCount}&stringCount=${count}`;
        setFilters({ ...filters, stringsCount: counts });
      }
    } else {
      const counts = `&stringCount=${count}`;
      setFilters({ ...filters, stringsCount: filters?.stringsCount?.replace(counts, '') });
    }
  };

  const handleClearButtonClick: MouseEventHandler = () => {
    setClearCheckbox(false);
    setFilters({
      minPrice: startMinPrice,
      maxPrice: startMaxPrice,
      type: '',
      stringsCount: '',
    });
  };

  useEffect(() => {
    dispatch(loadFilters(filters));
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
              onBlur={handleMinPriceOnBlur}
              value={minPrice}
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
              value={maxPrice}
              type="number"
              onBlur={handleMaxPriceOnBlur}
              placeholder={MAX_PRICE.toString()}
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
            onChange={handleTypeChange}
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
            onChange={handleTypeChange}
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
            onChange={handleTypeChange}
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
            disabled={disabledAcoustic}
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
            disabled={disabledUkulele}
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
            disabled={disabledUkulele}
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
            disabled={disabledUkulele || disabledElectric}
            onChange={handleStringsCheckboxChange}
            defaultChecked={clearCheckbox}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button
        onClick={handleClearButtonClick}
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
      >
        Очистить
      </button>
    </form>
  );
}
