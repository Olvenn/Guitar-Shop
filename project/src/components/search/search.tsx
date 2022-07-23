import { useState, useEffect, ChangeEvent } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { searchAction } from '../../store/api-actions';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { getSearchGuitars } from '../../store/reducers/selectors';
import { AppRoute } from '../../const';

export function Search(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const searchGuitars = useAppSelector(getSearchGuitars);

  const handleQueryChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setQuery(evt.target.value);
  };

  const handleSelecktClick = (link: string) => {
    navigate(link);
    setQuery('');
  };

  const handleIconCloseClick = () => {
    setQuery('');
  };

  useEffect(() => {
    if (!query) {
      dispatch(searchAction(''));
    } else {
      dispatch(searchAction(query));
    }
  }, [query, dispatch]);

  return (
    <div className="form-search">
      <form className="form-search__form" id="form-search">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search" />
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          onChange={handleQueryChange}
          id="search"
          value={query}
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={`${query.length > 0
        ? 'form-search__select-list list-opened'
        : 'form-search__select-list hidden'}`}
      >
        {searchGuitars?.length !== 0 ?
          searchGuitars?.map(({ id, name }) => (
            <li key={id}
              onClick={() => {
                handleSelecktClick(generatePath(AppRoute.Item, { id: `${id}` }));
              }}
              className="form-search__select-item"
              tabIndex={0}
            >{name}
            </li>
          ))
          : 'Нет совпадений.'}
      </ul>
      <button
        onClick={handleIconCloseClick}
        className="form-search__reset"
        type="reset"
        form="form-search"
      >
        <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}
