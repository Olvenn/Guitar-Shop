import { useAppSelector } from '../../hooks/';
// import CitiesList from '../cities-list/cities-list';
import { getGuitars } from '../../store/reducers/selectors';
import CatalogItem from '../catalog-item/catalog-item';

function CatalogList(): JSX.Element {
  const guitars = useAppSelector(getGuitars);
  // eslint-disable-next-line no-console
  console.log('guitars', guitars);

  return (
    <div className="cards catalog__cards">
      {guitars.map((guitar) => (
        <CatalogItem
          key={guitar.id}
          guitar={guitar}
        />
      ))}
    </div>
  );
}
export default CatalogList;
