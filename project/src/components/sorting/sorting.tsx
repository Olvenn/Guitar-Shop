import { SortTypes, SortPrice } from '../../const';

function Sorting(): JSX.Element {
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        {(Object.entries(SortTypes)).map(([key, item]) => (
          <button key={key} className="catalog-sort__type-button" aria-label={`${item}`}>{item}</button>
        ))}
      </div>
      <div className="catalog-sort__order">
        {(Object.entries(SortPrice)).map(([key, item]) => (
          <button key={key} className="catalog-sort__order-button catalog-sort__order-button--up" aria-label={`${item}`}></button>
        ))}
      </div>
    </div>
  );
}
export default Sorting;
