import { useAppSelector } from '../../hooks/';
import { getGuitars } from '../../store/reducers/selectors';
import { CatalogItem } from '../catalog-item/catalog-item';

export function CatalogList(): JSX.Element {
  const guitars = useAppSelector(getGuitars);

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
