import { useState, useEffect, MouseEventHandler, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/';
import { useComponentDidUpdate } from '../../hooks/use-component-did-update';
import { loadFilters, defaultFilters } from '../../store/reducers/guitars';
import { selectMinPrice, selectMaxPrice } from '../../store/reducers/selectors';
import { StringsCount } from '../../const';

export function Filters(): JSX.Element {
  const dispatch = useAppDispatch();

  const startMinPrice = useAppSelector(selectMinPrice);
  const startMaxPrice = useAppSelector(selectMaxPrice);
  const [filters, setFilters] = useState(defaultFilters);
  const [clearCheckbox, setClearCheckbox] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    setMinPrice(String(filters.minPrice));
    setMaxPrice(String(filters.maxPrice));
  }, [filters]);

  const disabledExceptionFour = ((filters?.type?.includes('ukulele')
    && !filters?.type?.includes('acoustic')
    && !filters?.type?.includes('electric')));

  const disabledTwelve = ((filters?.type?.includes('electric')
    && !filters?.type?.includes('acoustic')));

  const disabledFour = ((filters?.type?.includes('acoustic')
    && !filters?.type?.includes('electric')));

  const enabledAll = ((!filters?.stringsCount?.includes(StringsCount.Seven)
    && !filters?.stringsCount?.includes(StringsCount.Four)) && !filters?.stringsCount?.includes(StringsCount.Twelve) && !filters?.stringsCount?.includes(StringsCount.Four));

  const disabledUkulele = ((!filters?.stringsCount?.includes(StringsCount.Twelve)));

  const disabledAcoustic = ((filters?.stringsCount?.includes(StringsCount.Seven)
    || filters?.stringsCount?.includes(StringsCount.Six)) || filters?.stringsCount?.includes(StringsCount.Twelve));

  const disabledElectric = ((filters?.stringsCount?.includes(StringsCount.Four)
    || filters?.stringsCount?.includes(StringsCount.Six)) || filters?.stringsCount?.includes(StringsCount.Seven));

  const handleMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setMinPrice(evt.target.value);
  };

  const handleMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(evt.target.value);
  };

  const handleMinPriceOnBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Number(minPrice) > Number(maxPrice) || (Number(minPrice) < Number(startMinPrice))) {
      setMinPrice(String(startMinPrice));
      setFilters({ ...filters, minPrice: Number(startMinPrice) });
    } else {
      setMinPrice(evt.target.value);
      setFilters({ ...filters, minPrice: Number(minPrice) });
    }
  };

  const handleMaxPriceOnBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Number(minPrice) > Number(maxPrice) || (Number(maxPrice) > Number(startMaxPrice))) {
      setMinPrice(String(startMaxPrice));
      setFilters({ ...filters, maxPrice: Number(startMaxPrice) });
    } else {
      setMaxPrice(evt.target.value);
      setFilters({ ...filters, maxPrice: Number(maxPrice) });
    }
  };

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
      minPrice: undefined,
      maxPrice: undefined,
      type: '',
      stringsCount: '',
    });
  };

  useComponentDidUpdate(() => {
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
              onChange={handleMinPriceChange}
              onBlur={handleMinPriceOnBlur}
              value={minPrice.toString()}
              type="number"
              placeholder={startMinPrice ? String(startMinPrice) : ''}
              id="priceMin"
              name="от"
              min={startMinPrice ? String(startMinPrice) : ''}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              onChange={handleMaxPriceChange}
              onBlur={handleMaxPriceOnBlur}
              value={maxPrice}
              type="number"
              placeholder={startMaxPrice ? String(startMaxPrice) : ''}
              id="priceMax"
              name="до"
              max={startMaxPrice ? String(startMaxPrice) : ''}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            defaultChecked={clearCheckbox || filters?.type?.includes('acoustic')}
            type="checkbox"
            id="acoustic"
            name="acoustic"
            onChange={handleTypeChange}
            disabled={!disabledAcoustic && !enabledAll}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            defaultChecked={clearCheckbox || filters?.type?.includes('electric')}
            type="checkbox"
            id="electric"
            name="electric"
            disabled={!disabledElectric && !enabledAll}
            onChange={handleTypeChange}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            defaultChecked={clearCheckbox || filters?.type?.includes('ukulele')}
            type="checkbox"
            id="ukulele"
            name="ukulele"
            onChange={handleTypeChange}
            disabled={disabledUkulele && !enabledAll}
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
            defaultChecked={clearCheckbox || filters?.stringsCount?.includes('4')}
            disabled={disabledFour}
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
            disabled={disabledExceptionFour}
            defaultChecked={clearCheckbox || filters?.stringsCount?.includes('6')}
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
            disabled={disabledExceptionFour}
            defaultChecked={clearCheckbox || filters?.stringsCount?.includes('7')}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            disabled={disabledExceptionFour || disabledTwelve}
            onChange={handleStringsCheckboxChange}
            defaultChecked={clearCheckbox || filters?.stringsCount?.includes('12')}
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
